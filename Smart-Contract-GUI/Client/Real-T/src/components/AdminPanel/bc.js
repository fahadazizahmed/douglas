import React from "react";
import MaterialTable from "material-table";
import { Icons } from "./AdminPanel/helpers";
import { Button, FormControl, Paper, Switch } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { addListing, deleteListing, getMyListings, updateListing } from "../api/listings";
import config from "../config/config";
import { ethers, Wallet } from "ethers";
const Web3 = require('web3');

const Listings = () => {
  //listings array
  const [listings, setListings] = React.useState([]);
  const [update, toggleUpdate] = React.useState(false);
  const [provider, setProvider] = React.useState(null);
  const [network, setNetwork] = React.useState();
  const [publicKey, setPublickey] = React.useState(null);
  // listing image ref
  const image = React.useRef("");


  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (data) => {
        console.log("Chain Data", data)

      });
      window.ethereum.on("accountsChanged", (data) => {
        console.log("accountsChanged", data)
        setPublickey(data[0])
      });
    }
  }, []);

  let makeTransaction = async () => {


    // try {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   await window.ethereum.enable();
    //   const contract = new ethers.Contract(config.contractAddress, config.ABI, provider);
    //   const signer = provider.getSigner()
    //   const daiWithSigner = contract.connect(signer);

    //   let res = await daiWithSigner.addProperty("dddd", "MainStreet", "sss", ethers.utils.parseEther("0.2"), { value: ethers.utils.parseEther("0.01") });
    //   console.log("res", res)
    // }
    // catch (e) {
    //   console.log("eevccc", e)
    // }

    const web3 = new Web3(window.ethereum);

    // Request user permission to connect to Metamask
    window.ethereum.enable();

    const uri = 'https://example.com/property.json';
    const name = '123 Main Street';
    const addr = '0x1234567890123456789012345678901234567890';
    const rentAmount = web3.utils.toWei('0.01', 'ether'); // 1 ether
   

    const options = {
      from: "0x6983cB83052588AF94Cf9a937e664698e4E63490",
      value: 10000000000000000 // 1 ETH in wei, assuming the mintFee is 1 ETH
    };




    const contract = new web3.eth.Contract(config.ABI, config.contractAddress);
    contract.methods.addProperty(uri, name, addr, rentAmount).send(options)
      .on('transactionHash', function (hash) {
        console.log('Property added:', hash);
      })
      .on('error', function (error) {
        console.error('Error adding property:', error);
      });






  }



  // React.useEffect(() => {
  //   let start = async () => {
  //   //   if (window.ethereum) {
  //   //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   //     const accounts = await provider.send("eth_requestAccounts", []);
  //   //     const { name, chainId } = await provider.getNetwork();
  //   //     if (chainId === 1) {
  //   //       setPublickey(accounts[0]);
  //   //       setNetwork("Ethereum");
  //   //     }

  //   //     try {
  //   //       await window.ethereum.enable();



  //   //     } catch (error) {
  //   //       console.error(error);
  //   //     }
  //   //     setProvider(provider);
  //   //   }



  //   //   else if (window.web3) {
  //   //     setProvider(
  //   //       new ethers.providers.Web3Provider(window.web3.currentProvider)
  //   //     );
  //   //   } else {
  //   //     alert("No web3 provider found. Please install Metamask.");
  //   //   }
  //   // };

  //   start();
  // }, []);



  React.useEffect(() => {
    // fetching listings
    getMyListings().then((res) => setListings(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings.length, update]);

  return (
    <Paper style={{ padding: '30px' }}>
      <MaterialTable
        icons={Icons}
        title="Listings"
        columns={[
          {
            title: "ID",
            render: (rowData) => rowData?.tableData.id + 1,
            editable: "never",
          },
          {
            title: "Property Image",
            field: "image",
            editComponent: () => (
              <div value="photo">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  required
                  ref={image}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </label>
              </div>
            ),
            render: (rowData) => (
              <img
                style={{ height: 200, width: 150 }}
                src={`${config.backendUrl}/api/${rowData.image}`}
                alt={`${config.backendUrl}/api/${rowData.image}`}
              />
            ),
          },
          { title: "Property Name", field: "name" },
          { title: "Description", field: "description" },
          { title: "Zillow Link", field: "zillowLink" },
          { title: "Price", field: "price" },
          {
            title: "Available",
            field: "available",
            editComponent: (tableData) => (
              <FormControl required>
                <Switch
                  name="available"
                  defaultChecked={tableData.rowData.available}
                  onChange={() =>
                    (tableData.rowData.available = !tableData.rowData.available)
                  }
                  color="primary"
                />
              </FormControl>
            ),
            render: (rowData) => (
              rowData.available ? "✅" : "❌"
            ),
            editable: "onUpdate",
          },
          {
            title: "Sold", field: "sold",
            render: (rowData) => (
              rowData.sold ? "✅" : "❌"
            ),
            editable: "never",
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {

              // First make transaction

              setTimeout(async () => {
                const form_data = new FormData();
                console.log("form_data", form_data)

                for (var key in newData) {
                  form_data.append(key, newData[key]);
                }
                console.log("form_data 1", form_data)

                form_data.append("image", image.current?.files[0]);
                let res = await makeTransaction()
                // if (res) {
                //   addListing(form_data)
                //     .then(() => {
                //       resolve();
                //       toggleUpdate(!update);
                //     })
                //     .catch((err) => {
                //       reject(
                //         alert(
                //           "error: All fields are required and price must be a number"
                //         )
                //       );
                //     });
                // }
              }, 100);





            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const form_data = new FormData();

                for (var key in newData) {
                  form_data.append(key, newData[key]);
                }
                image.current?.files[0] &&
                  form_data.append("image", image.current?.files[0]);
                updateListing(newData._id, form_data)
                  .then(() => {
                    resolve();
                    toggleUpdate(!update);
                  })
                  .catch((err) => {
                    reject(
                      alert(
                        "error: All fields are required and price must be a number"
                      )
                    );
                  });
              }, 100);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteListing(oldData._id).then(() => {
                  resolve();
                  toggleUpdate(!update);
                }).catch(e => reject())
              }, 100);
            })
        }}
        data={listings}
        options={{
          paging: false,
        }}
      />
    </Paper>
  );
};

export default Listings;
