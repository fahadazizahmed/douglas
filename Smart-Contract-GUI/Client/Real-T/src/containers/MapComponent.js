import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { NavLink, useParams, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import MapContainer from "./MapContainer";
import { LoadScript } from "@react-google-maps/api";
import config from "../config/config";
const lib = ["places"];

const MapComponent = () => {

    // const { lat, long } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const lat = searchParams.get('lat');
    const long = searchParams.get('long');
    const name = searchParams.get('name');
    console.log("lat", lat)

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
                    Real-T m Properties ({name})
                </Typography>
            </div>
            <div>
                <LoadScript googleMapsApiKey={config.googlsApiKey} libraries={lib}>
                    <MapContainer name={name} latitude={lat} longitude={long} ></MapContainer>
                </LoadScript>



            </div>


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

export default MapComponent;
