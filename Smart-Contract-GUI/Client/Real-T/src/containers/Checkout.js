import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Divider, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { checkout, getCartPopulated, getProfile, updateCart } from "../api/user";
import NavBar from "../components/NavBar";
import config from "../config/config";
import { Input } from 'antd';
import PdfModal from './PdfModal';
import Modal from 'react-modal';
import { PDFDocument, StandardFonts } from 'pdf-lib';

import { getItemPrice } from "../components/AdminPanel/helpers";
const Web3 = require('web3');
const { TextArea } = Input;
const Checkout = () => {
  const [cartData, setCartData] = React.useState({ items: [], loading: false });
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [isLoad, setIsLoad] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [showPdfModal, setShowPdfModal] = React.useState(false);
  const [pdfUrlFilled, setPdfUrlFilled] = React.useState('');
  const history = useHistory();
  const [user, setUser] = React.useState({});
  const classes = useStyles();

  React.useEffect(() => {
    //setting loading to true
    setCartData({ ...cartData, loading: true });
    getCartPopulated().then((res) =>
      setCartData({ ...cartData, items: res.data })
    );
    getProfile().then((res) => setUser(res.data));
    //setting loading to false
    setCartData({ ...cartData, loading: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData.loading]);

  React.useEffect(() => {
    setTotalAmount(calcTotalAmount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData.items]);

  const calcTotalAmount = () => {
    return cartData.items?.reduce(
      (acc, item) =>
        acc + getItemPrice(item),
      0
    );
  };

  const emptyCart = async () => {
    await updateCart([]);
  };




  let generatePDF = async (doc) => {
    const pdfUrl = `${config.backendURL}/agreement/${doc}`
   

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
      y: 600,
      size: 12,
      font,
    });
    const currentDate = new Date();


    page.drawText(currentDate.toLocaleDateString(), {
      x: 144,
      y: 468,
      size: 12,
      font,
    });
    const currentDates = new Date();
    currentDates.setFullYear(currentDates.getFullYear() + 1);
    const dateString = currentDates.toLocaleDateString();
    console.log("dateString", dateString);


    page.drawText(dateString, {
      x: 455,
      y: 468,
      size: 12,
      font,
    });




    // Save the filled-out PDF document as a new file
    const pdfBytesFilled = await pdfDoc.save();
    const pdfUrlFilled = URL.createObjectURL(new Blob([pdfBytesFilled], { type: 'application/pdf' }));
    setPdfUrlFilled(pdfUrlFilled);
    setShowPdfModal(true);
  }






  let submitTransaction = async () => {
    try {

      let monthName = "Jan";
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;

      if (currentMonth === 1) {
        monthName = "Jan"
      }
      else if (currentMonth === 2) {
        monthName = "Feb"
      }
      else if (currentMonth === 3) {
        monthName = "Mar"
      }
      else if (currentMonth === 4) {
        monthName = "Apr"
      }
      else if (currentMonth === 5) {
        monthName = "May"
      }
      else if (currentMonth === 6) {
        monthName = "Jun"
      }
      else if (currentMonth === 7) {
        monthName = "Jul"
      }
      else if (currentMonth === 8) {
        monthName = "Aug"
      }
      else if (currentMonth === 9) {
        monthName = "Sep"
      }
      else if (currentMonth === 10) {
        monthName = "Oct"
      }
      else if (currentMonth === 11) {
        monthName = "Nov"
      }
      else if (currentMonth === 12) {
        monthName = "Dec"
      }
      setIsLoad(true)
      setDisable(true)

      for (var i = 0; i < cartData.items.length; i++) {

        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();


        const month = monthName;
        const value = web3.utils.toWei(cartData.items[i].price.toString(), 'ether'); // The amount of Ether to send with the transaction
        const contract = new web3.eth.Contract(config.ABI1, cartData.items[i].propertyContractID);
        const result = await contract.methods.registerTenantWithRent(month).send({
          from: accounts[0],
          value: value,
          gas: 500000
        });

      }
      return checkout({
        date: Date.now(),
        customer: user._id,
        docs: cartData.items[0].agreementDocs,
        items: cartData.items.map((item) => {
          return {
            item: item._id,
            price: getItemPrice(item),
            owner: item.owner,
          };
        }),
        totalAmount: (totalAmount * 1.088).toFixed(2),
      })
        .then(() => emptyCart())
        .then(() => {
          setCartData({ ...cartData, items: [] });
          setIsLoad(false)
          setDisable(false)
          history.push("/real-t/my-properties");
        })
    }
    catch (e) {
      console.log("Errr", e)
      alert("Facing some issue to checkout")
      setIsLoad(false)
      setDisable(false)

    }


  }

  let makeTransaction = async () => {
    try {
      generatePDF(cartData.items[0].agreementDocs)
    }
    catch (e) {

    }


  }



  return (
    <div>
      <NavBar />
      <div className="container d-flex">

        <div className="col-sm-6 text-center mx-auto p-3">
          <Paper className="p-3">
            <Typography variant="h4" gutterBottom>
              Checkout
            </Typography>
            <List disablePadding>
              {cartData.items?.map((item) => (
                <ListItem className={classes.listItem} key={item._id}>
                  <ListItemText
                    primary={item.name}
                  />
                  <Typography variant="body2">
                    ${" "}
                    {getItemPrice(item)}
                  </Typography>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Tax 8.8%" />
                <Typography
                  variant="subtitle1"
                  component={"h4"}
                  className={classes.total}
                >
                  $ {(totalAmount * 0.088).toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className={classes.total}
                >
                  $ {(totalAmount * 1.088).toFixed(2)}
                </Typography>
              </ListItem>
            </List>
            <Divider />
            <button disabled={disable} onClick={makeTransaction} className="mt-4" style={{ width: "100%", height: 50, borderRadius: 4, background: "#f66a0a", borderColor: "white", color: "white", fontWeight: "bold" }}>{isLoad === true ? <img alt="loading..." style={{ height: '20px', width: '20px', marginRight: '8px' }} src="./assets/img/spinner3.gif"></img> : "MetaMask"}</button>
            <Grid item container direction="column" xs={12} className='mt-2'>
              <PayPalButton
                options={{
                  clientId:
                    "AVIUOnkpCJfd2VaqHs6lcr0UohLXv9qMdQNTyzA3Wkl8-sHROqARqvaWlI8ctVdUjXIOEum1q6tvAE6e",
                }}
                onError={e => console.log}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: (totalAmount * 1.088).toFixed(2),
                          breakdown: {
                            item_total: {
                              currency_code: "USD",
                              value: totalAmount,
                            },
                            tax_total: {
                              currency_code: "USD",
                              value: (totalAmount * 0.088).toFixed(2),
                            },
                          },
                        },
                        items: cartData.items?.map((item) => {
                          return {
                            name: item.name,
                            unit_amount: {
                              currency_code: "USD",
                              value:
                                getItemPrice(item),
                            },
                            quantity: 1,
                            description: item.description,
                            tax: {
                              currency_code: "USD",
                              value: (
                                getItemPrice(item) * 0.088
                              ).toFixed(2),
                            },
                          };
                        }),
                        shipping: {
                          name: {
                            full_name: user.firstName + " " + user.lastName,
                          },
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(async (details) => {
                    alert(
                      "Order was submitted successfully"
                    );

                    return checkout({
                      date: Date.now(),
                      customer: user._id,
                      items: cartData.items.map((item) => {
                        return {
                          item: item._id,
                          price: getItemPrice(item),
                          owner: item.owner,
                        };
                      }),
                      totalAmount: (totalAmount * 1.088).toFixed(2),
                    })
                      .then(() => emptyCart())
                      .then(() => {
                        setCartData({ ...cartData, items: [] });
                        history.push("/real-t/properties");
                      });
                  });
                }}
              />
            </Grid>
          </Paper>
        </div>
      </div>


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
          <button
            //disabled={isDisable} 
            className="button" onClick={() => {
              setShowPdfModal(false)
              submitTransaction()

            }


            }>
            {/* {isLoading === true ? (
              <img
                alt="loading..."
                style={{
                  height: "20px",
                  width: "20px",
                  marginRight: "8px",
                }}
                src="assets/img/spinner3.gif"
              ></img>
            ) : null} */}


            Continue</button>

          <button
            style={{ background: "gray" }}
            className="button ml-2" onClick={() => { setShowPdfModal(false) }}>
            Close
          </button>
        </div>
        <iframe src={pdfUrlFilled} width="100%" height="100%" style={{ border: 'none' }} />

      </Modal>
    </div>
  );
};

export default Checkout;

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));
