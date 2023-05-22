
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import config from "../config/config";
import { Link } from "react-router-dom";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { editListing, addPdf } from '../api/listings';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import Web3 from 'web3';
import propertyContract from "../config/propertyContract.json"
import { getProfile } from "../api/user";
import PdfModal from './PdfModal';
import Modal from 'react-modal';
import SAlert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import { getUserForUpdate } from '../api/listings';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import Navbar from "../components/NavBar";

import { useLocation, useHistory, useParams } from 'react-router-dom';



function EditProperty() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [addr, setAddress] = useState("")
  const [zallowLink, setZallowLink] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null);
  const [selectedLink, setSelectedLink] = useState('');
  const [document, setDocument] = useState("")
  const [user, setUser] = React.useState({});
  const [coordinates, setCoordinates] = useState(null);
  const [imageLink, setImageLink] = useState("");

  const [docUrl, setDocUrl] = useState([])
  const [pdf, setPdf] = useState("")
  const [visible, setVisible] = useState(false)

  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrlFilled, setPdfUrlFilled] = useState('');
  const location = useLocation();
  const { id } = useParams();
  const documentReceoive = location.state.doc;



  const handleChangeStatus = async (fileWithMeta) => {
    setImageLink("")
    setImage(fileWithMeta.file)

  }

  useEffect(() => {


    const getUserForUpdates = async () => {
      try {
        const { data } = await getUserForUpdate(id)
        setName(data.name)
        setAddress(data.address)
        setPrice(data.price)
        setZallowLink(data.zillowLink)
        setDescription(data.description)
        setImageLink(data.image)
        console.log("data", data)

      }
      catch (e) {
        console.log("eeee", e)
        alert("Facing some issue to get data")
      }


    }
    getUserForUpdates()
    // await addListing(body)


  }, [])



  useEffect(() => {

    getProfile().then((res) => setUser(res.data));

    let getPdfDocumenta = async () => {
      setDocUrl([...docUrl, { name: documentReceoive, url: `${config.backendURL}/doc/${documentReceoive}` }]);

    }
    getPdfDocumenta()

  }, [])

  let generatePDF = async (doc) => {
    const pdfUrl = `${config.backendURL}/doc/${documentReceoive}`

    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());

    // Create a new PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the first page of the PDF document
    const page = pdfDoc.getPage(0);

    // Get the font to use for the form fields
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Set the name, address, and description form fields

    page.drawText(user.firstName, {
      x: 160,
      y: 643,
      size: 12,
      font,
    });

    // page.drawText("Haris", {
    //   x: 160,
    //   y: 600,
    //   size: 12,
    //   font,
    // });

    // const currentDate = new Date();


    // page.drawText(currentDate.toLocaleDateString(), {
    //   x: 144,
    //   y: 468,
    //   size: 12,
    //   font,
    // });

    page.drawText(price + " Ether", {
      x: 459,
      y: 495,
      size: 12,
      font,
    });

    page.drawText(addr, {
      x: 290,
      y: 525,
      size: 12,
      font,
    });



    // Save the filled-out PDF document as a new file
    const pdfBytesFilled = await pdfDoc.save();
    const pdfUrlFilled = URL.createObjectURL(new Blob([pdfBytesFilled], { type: 'application/pdf' }));
    setPdfUrlFilled(pdfUrlFilled);
    setShowPdfModal(true);
  }


  let deployContract = async () => {
    alert("hoit iakaiaia")

    // Connect to MetaMask
    const web3 = new Web3(window.ethereum);

    // Request user permission to connect to Metamask
    await window.ethereum.enable();
    let accounts = await web3.eth.getAccounts()
    setIsLoading(true)
    setIsDisable(true)
    alert("abc")
    // Set up the contract instance
    const myContract = new web3.eth.Contract(propertyContract);
    // Deploy the contract
    myContract.deploy({
      data: config.contractByteCode,
      arguments: [name, addr, 30, web3.utils.toWei(price, 'ether'), 1, config.nftAddress] // Add any constructor arguments here
    })

      .send({
        from: accounts[0],
        value: web3.utils.toWei('0.01', 'ether'), // Set the value to 0.1 ether
        gas: web3.utils.toHex(8000000), // Increase the gas limit
        gasPrice: web3.utils.toWei('5', 'gwei') // web3.utils.toHex(web3.utils.toWei('5', 'gwei')), // Increase the gas price
      })
      .on('transactionHash', async function (hash) {
      })
      .on('receipt', async function (receipt) {
        console.log('Contract address:', receipt.contractAddress);


        try {
          const body = new FormData()
          body.append('image', image)
          body.append('id', id)
          body.append("imageLink", imageLink)
          body.append('name', name)
          body.append('description', description)
          body.append("price", price)
          body.append('docs', documentReceoive)
          body.append("zillowLink", zallowLink)
          body.append("address", addr)
          body.append("propertyHash", receipt.contractAddress)
          await editListing(body)
          setIsLoading(false)
          setIsDisable(false)
          setShowPdfModal(false)
          SAlert.success('Congratulations! The property details have been edited successfully.');
          setTimeout(() => {
            history.push("/real-t/properties")
          }, 1000)


        }
        catch (e) {
          setIsLoading(false)
          setIsDisable(false)
          alert("We are facing some issue to add a property")

        }
        return
      })
      .on('error', function (error) {
        setIsLoading(false)
        setIsDisable(false)
        console.error('Error deploying contract:', error);
        return null

      });

  }

  let submitTransaction = async () => {
    try {
      await deployContract()
    }
    catch (e) {

    }
  }


  let submitProperty = async (e) => {
    e.preventDefault()


    if (name === '' || name === null) {
      setIsError(true)
      setMessage("Property name is required")
      return
    }

    if (addr === '' || addr === null) {
      setIsError(true)
      setMessage("Address is required")
      return
    }

    if (price === '' || price === null || price == 0) {
      setIsError(true)
      setMessage("Price is required")
      return
    }
    if (zallowLink === '' || zallowLink === null) {
      setIsError(true)
      setMessage("Zallow Link is required")
      return
    }
    if (description === '' || description === null) {
      setIsError(true)
      setMessage("Description is required")
      return
    }
    if (image === '' || image === null || image === undefined || image === []) {
      setIsError(true)
      setMessage("Please select the property image")
      return
    }

    try {
      setIsError(false)
      setMessage("")
      generatePDF(document)
    }
    catch (e) {


    }
  }


  return (

    <div className="limiter">
      <Navbar />
      {console.log("LRLRLRLRL", user)}

      <div className="container-login100">
        {/* 
        <div>
          <iframe src={`${config.pdfUrl}/${documentReceoive}`} width="100%" height="500px"></iframe>
        </div> */}



        <div className="wrap-login100">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-43 mb-4">
              Add New Propert
            </span>
            <label className="mb-2 txt2">Name</label>
            <div
              className="validate-input mb-4"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                autoFocus={true}
                //// onKeyPress={this.onKeyPress}
                onChange={(e) => setName(e.target.value)}
                value={name}

                type="text"
                className="form-control"
              />
            </div>

            <label className="mb-2 txt2">Address</label>
            <div
              className="validate-input mb-4"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input

                //// onKeyPress={this.onKeyPress}
                onChange={(e) => setAddress(e.target.value)}
                value={addr}

                type="text"
                className="form-control"
              />
            </div>



            <label className="mb-2 txt2">Price</label>
            <div
              className="mb-4 validate-input position-relative"
              data-validate="Password is required"
            >
              <input
                // onKeyPress={this.onKeyPress}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="form-control"
                type='number'
              // type={this.state.passwordType}
              />
              <span className="focus-input100" />



            </div>

            <label className="mb-2 txt2">Zallow Link</label>
            <div
              className="mb-4 validate-input position-relative"
              data-validate="Password is required"
            >
              <input
                // onKeyPress={this.onKeyPress}
                onChange={(e) => setZallowLink(e.target.value)}
                value={zallowLink}
                className="form-control"
              // type={this.state.passwordType}
              />
              <span className="focus-input100" />



            </div>


            <label className="mb-2 txt2">Description</label>
            <div
              className="mb-4 validate-input position-relative"
              data-validate="Password is required"
            >
              <textarea
                // onKeyPress={this.onKeyPress}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="form-control"
              // type={this.state.passwordType}
              />
              <span className="focus-input100" />

              <div style={{ marginTop: 12 }}>
                <iframe
                  src={`${config.backendURL}/doc/${documentReceoive}`}

                  // src="https://www.africau.edu/images/default/sample.pdf"

                  width="100%" height="200px"></iframe>
              </div>



            </div>


            {
              imageLink && <img style={{ height: 200, width: 200 }} src={`${config.backendURL}/api/${imageLink}`} />
            }


            {/* <div style={{ margin: 0, padding: 0 }} className="container mb-4">
              <select value={document} onChange={handleChange} className="select">
                <option value="">Select agreement document</option>
                {docUrl.map((link) => (
                  <option key={link.url} value={link.name}>
                    {link.name.slice(0, -4)}
                  </option>
                ))}
              </select>
              <button type="button" onClick={handleOpenLink} disabled={!document} className="button">
                Open Link
              </button>
            </div> */}

            <Dropzone


              styles={{
                dropzone: {
                  minHeight: 250, maxHeight: 250,

                },
                inputLabel: {
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '10px',
                },
                previewImage: {
                  maxHeight: '200px',
                  maxWidth: '100%',
                  marginBottom: '10px',
                },

              }}



              accept="image/*"
              maxFiles={1}
              inputContent=""
              onChangeStatus={handleChangeStatus}


            ></Dropzone>




            {/* <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            /> */}

            {isError ? (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            ) : null}

            <div className="flex-sb-m w-full p-t-3 p-b-32">
              <div className="contact100-form-checkbox">
                {/* <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" /> */}
                {/* <label className="label-checkbox100" htmlFor="ckb1"> */}
                {/* Remember me */}
                {/* </label> */}
              </div>
            </div>


            <div className="container-login100-form-btn mt-4">
              <button
                type="button"

                onClick={(event) => submitProperty(event)}
                className="login100-form-btn buttonabc"
              >

                Add Property
              </button>
            </div>
            <div className="text-center p-t-46 p-b-20 mt-4">
              {/* <div>
                                Already have an account 
                                <a href="#" className="txt1">
                                   Login
                                </a>
                            </div> */}


            </div>
          </form>
          {/* <div
            className="login100-more"
            style={{ backgroundImage: 'url("assets/img/jmm_4377.jpg")' }}
          ></div> */}
        </div>

      </div>
      {/* <Modal isOpen={showPdfModal} onRequestClose={() => setShowPdfModal(false)}>
        <iframe src={pdfUrlFilled} width="100%" height="100%" />
      </Modal> */}


      <Modal
        isOpen={showPdfModal}
        onRequestClose={() => setShowPdfModal(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9999,
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '800px',
            maxHeight: '80%',
            border: 'none',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
            padding: '0',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
          <button disabled={isDisable} className="button" onClick={() => {
            submitTransaction()

          }


          }>
            {isLoading === true ? (
              <img
                alt="loading..."
                style={{
                  height: "20px",
                  width: "20px",
                  marginRight: "8px",
                }}
                src="assets/img/spinner3.gif"
              ></img>
            ) : null}


            Continue</button>
        </div>
        <iframe src={pdfUrlFilled} width="100%" height="100%" style={{ border: 'none' }} />

      </Modal>
      <SAlert stack={{ limit: 30 }} effect='slide' position='top-right' />

    </div>
  );
}




export default EditProperty
