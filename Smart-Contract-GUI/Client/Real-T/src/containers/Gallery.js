import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PaletteIcon from "@material-ui/icons/Palette";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Pagination from "../components/Pagination";
import { getListings, getListByID, deleteListing } from "../api/listings";
import { getCart, addItemToCart } from "../api/user";
import Navbar from "../components/NavBar";
import config from "../config/config";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import SAlert from 'react-s-alert';
import MapContainer from "./MapContainer";
import { LoadScript } from "@react-google-maps/api";
const lib = ["places"];
const key = "AIzaSyDjPGDk9VIpePUOSshS7FBMi9VY7IVGV2E"; // PUT GMAP API KEY HERE

const Gallery = () => {
  // listings array
  const [listingsData, setListingsData] = React.useState({
    items: [],
    loading: false,
  });
  //user state
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPages] = React.useState(9);
  const [isLoading, setIsLoading] = React.useState("");
  const [disable, setIsDisable] = React.useState(false);
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const [cartItems, setCartItems] = React.useState([]);
  const [update, toggleUpdate] = React.useState(false);
  const classes = useStyles();

  const role = localStorage.getItem("role");

  const addToCart = (_id) => {
    console.log("carrrr", cartItems)
    if (cartItems.length === 0) {
      addItemToCart(_id)
        .then((res) => toggleUpdate(!update))
        .catch((e) => alert("Error while adding item to cart"));
    }
    else {
      alert("You currently have an item in cart. Please remove it before adding another one.")
    }

  };
  React.useEffect(() => {
    //setting loading to true
    setListingsData({ ...listingsData, loading: true });

    let role = localStorage.getItem("role")
    if (role === "tenant") {
      getListings().then((res) =>
        setListingsData({ ...listingsData, items: res.data })
      );
      getCart().then((res) => setCartItems(res.data));

      //setting loading to false
      setListingsData({ ...listingsData, loading: false });

    }
    else if (role === "landlord") {
      getListByID().then((res) =>
        setListingsData({ ...listingsData, items: res.data })
      );
      getCart().then((res) => setCartItems(res.data));

      //setting loading to false
      setListingsData({ ...listingsData, loading: false });

    }
    else {
      getListings().then((res) =>
        setListingsData({ ...listingsData, items: res.data })
      );
      getCart().then((res) => setCartItems(res.data));

      //setting loading to false
      setListingsData({ ...listingsData, loading: false });

    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingsData.loading, update]);

  const currentItems = listingsData.items.slice(
    indexOfFirstItems,
    indexOfLastItems
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>

      <Navbar />
      <div className="container my-3 text-center">
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          Real-T m Properties
        </Typography>
      </div>
      <div className="row">
        {/* <LoadScript googleMapsApiKey={key} libraries={lib}>
          <MapContainer></MapContainer>
        </LoadScript> */}


        <Grid container justify="center" spacing={2} style={{ padding: 30 }}>
          {currentItems.map((item, index) => (
            <Grid key={index} item lg={4} sm={6} xl={4} xs={12}>
              {console.log("current ite", item)}
              <Card
                className={classes.root}
                style={{ opacity: item.sold ? "0.8" : "1" }}
              >
                <CardActionArea>


                  <CardMedia
                    className={classes.media}
                    image={`${config.backendURL}/api/${item.image}`}
                    //image={item.image}
                    title={item.name}
                  />
                  {item.sold && <div className={classes.sold}>SOLD!</div>}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    {item.owner && (
                      <>
                        {" "}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{ margin: "5px" }}
                        >
                          <PaletteIcon
                            fontSize="small"
                            style={{
                              display: "inline-block",
                              marginBottom: "5px",
                              marginRight: "5px",
                            }}
                          />{" "}
                          <strong>Owner:</strong>{" "}
                          <NavLink to={`/real-t/${item.owner.username}`}>
                            {item.owner.firstName} {item.owner.surname}{" "}
                          </NavLink>
                        </Typography>
                      </>
                    )}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ margin: "5px" }}
                    >
                      <MonetizationOnIcon
                        fontSize="small"
                        style={{
                          display: "inline-block",
                          marginBottom: "5px",
                          marginRight: "5px",
                        }}
                      />{" "}
                      <strong>Price:</strong> {item.price}{" "}
                      USD
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {role && (
                  <CardActions>
                    <NavLink to={`/real-t/listing/${item._id}`}>
                      <Button
                        style={{ backgroundColor: "#303030", color: "white" }}
                      >
                        Details
                      </Button>

                    </NavLink>
                    {role !== "tenant" &&

                      <NavLink to="#">

                        <Button
                          disabled={disable}
                          onClick={async () => {
                            try {
                              setIsLoading(item._id)
                              setIsDisable(true)
                              await deleteListing(item._id)

                              getListByID().then((res) =>
                                setListingsData({ ...listingsData, items: res.data })
                              );
                              getCart().then((res) => setCartItems(res.data));

                              // //setting loading to false



                              setIsLoading(false)
                              setIsDisable(false)
                              SAlert.success('Congratulations! The property has been successfully deleted.');

                            }
                            catch (e) {
                              setIsLoading(false)
                              setIsDisable(false)
                              alert("Facing some issue to delete property. Please try again later")
                            }

                          }}
                          style={{ backgroundColor: "#303030", color: "white" }}
                        >
                          {isLoading === item._id ? (
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
                          Delete
                        </Button>
                      </NavLink>
                    }

                    {
                      item.latitude === undefined ? null : role === "landlord" || role === "tenant" && (item.latitude && item.longitude) ?
                        <NavLink to={`/real-t/map?lat=${item.latitude}&&long=${item.longitude}&&name=${item.name}`}

                        //to={`/real-t/edit-property/${item._id}`}
                        >
                          <Button
                            style={{ backgroundColor: "#303030", color: "white" }}
                          >
                            View On Map
                          </Button>
                        </NavLink> : null



                    }






                    {role === "tenant" &&
                      !cartItems.includes(item._id) &&
                      !item.sold && (
                        <Button
                          onClick={() => addToCart(item._id)}
                          color="default"
                          style={{ backgroundColor: "" }}
                          className="bg-dark text-light btn btn-danger float-right mt-0"
                        >
                          <i className="fa fa-shopping-cart mr-2 pb-2"></i> Add
                          to Cart
                        </Button>
                      )}













                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="container" style={{ marginTop: "-45px" }}>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={listingsData.items.length}
          paginate={paginate}
          className="text-center"
        />
      </div>
      <SAlert stack={{ limit: 30 }} effect='slide' position='top-right' />
    </>
  );
};

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 350,
    width: "100%",
  },
  sold: {
    top: "2em",
    left: "-4em",
    color: "#fff",
    display: "block",
    position: "absolute",
    textAlign: "center",
    textDecoration: "none",
    letterSpacing: ".06em",
    backgroundColor: "#A00",
    padding: "0.5em 5em 0.4em 5em",
    textShadow: "0 0 0.75em #444",
    boxShadow: "0 0 0.5em rgba(0,0,0,0.5)",
    font: "bold 16px/1.2em Arial, Sans-Serif",
    webkitTextShadow: "0 0 0.75em #444",
    webkitBoxShadow: "0 0 0.5em rgba(0,0,0,0.5)",
    webkitTransform: "rotate(-45deg) scale(0.75,1)",
    zIndex: "10",
    "&::before": {
      content: "",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      position: "absolute",
      margin: "-0.3em -5em",
      transform: "scale(0.7)",
      webkitTransform: "scale(0.7)",
      border: "2px rgba(255,255,255,0.7) dashed",
    },
  },
});

export default Gallery;
