import React from "react";
import MaterialTable from "material-table";
import { Icons } from "./AdminPanel/helpers";
import { Button, FormControl, Paper, Switch } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { addListing, deleteListing, getMyListings, updateListing } from "../api/listings";
import config from "../config/config";
import fs from "fs"
const Web3 = require('web3');

const Listings = () => {
  //listings array
  const [listings, setListings] = React.useState([]);
  const [update, toggleUpdate] = React.useState(false);
  // listing image ref
  const image = React.useRef("");


  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (data) => {
        console.log("Chain Data", data)
        window.location.reload()

      });
      window.ethereum.on("accountsChanged", (data) => {
        console.log("accountsChanged", data)
        window.location.reload()
      });
    }
  }, []);

  let makeTransaction = async (newData) => {










  

    const web3 = new Web3(window.ethereum);
    // Request user permission to connect to Metamask
    await window.ethereum.enable();
    let accounts = await web3.eth.getAccounts()
    const myObj = {}; // empty object

    for (var key in newData) {
      myObj[key] = newData[key]; // add new key-value pair
     
    }
    



    const uri = 'http://localhost:2700/api/real-t/property.json';
    const name = myObj.name;
    const addr = myObj.zillowLink;
    const rentAmount = myObj.price // 1 ether

    const options = {
      from: accounts[0],
      value: web3.utils.toWei('0.01', 'ether') // 1 ETH in wei, assuming the mintFee is 1 ETH
    };
    const contract = new web3.eth.Contract(config.ABI, config.contractAddress);
    let response = await contract.methods.addProperty(uri, name, addr, rentAmount).send(options)
    console.log("My Back response is", response)
    if (response?.transactionHash) return response.transactionHash
    else return null




  }






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
                src={`${config.backendURL}/api/${rowData.image}`}
                alt={`${config.backendURL}/api/${rowData.image}`}
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

              if (image.current?.files[0] === undefined) {
                alert("Please provide an image")
                return
              }

              if (newData?.name === undefined) {
                alert("Please provide property name")
                return
              }
              if (newData?.description === undefined) {
                alert("Please provide property description")
                return
              }

              if (newData?.zillowLink === undefined) {
                alert("Please provide property zillowLink")
                return
              }
              if (newData?.price === undefined) {
                alert("Please provide property price")
                return
              }
              if (isNaN(newData?.price)) {
                alert("Price must be a number ")
                return
              }




              // First make transaction

              setTimeout(async () => {

                const form_data = new FormData();
                console.log("form_data", form_data)

                for (var key in newData) {
                  console.log("datatata", newData[key], key)
                  form_data.append(key, newData[key]);
                }
                console.log("form_data 1", form_data)

                form_data.append("image", image.current?.files[0]);


                let res = await makeTransaction(newData)

                if (!res) {
                  alert("Facing some issue to create a property")
                  return
                }



                form_data.append("propertyHash", res);
                if (res) {
                  addListing(form_data)
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
                }
              }, 100);





            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                console.log("my old da", newData)


                if (newData?.name === undefined || newData?.name === "" || newData?.name === null) {
                  alert("Please provide property name")
                  return
                }
                if (newData?.description === undefined || newData?.description === "" || newData?.description === null) {
                  alert("Please provide property description")
                  return
                }

                if (newData?.zillowLink === undefined || newData?.zillowLink === "" || newData?.zillowLink === null) {
                  alert("Please provide property zillowLink")
                  return
                }
                if (newData?.price === undefined || newData?.price === "" || newData?.price === null || newData?.price === 0) {
                  alert("Please provide property price")
                  return
                }
                if (isNaN(newData?.price)) {
                  alert("Price must be a number ")
                  return
                }


                const form_data = new FormData();

                for (var key in newData) {
                  form_data.append(key, newData[key]);
                }
                image.current?.files[0] &&
                  form_data.append("image", image.current?.files[0]);
                let res = await makeTransaction()
                if (!res) {
                  alert("Facing some issue to create a property")
                  return
                }
                form_data.append("propertyContractID", res);
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
