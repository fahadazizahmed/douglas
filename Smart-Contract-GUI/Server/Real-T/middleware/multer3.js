// Set up the Multer middleware to handle file uploads

const path = require("path")
const fs = require("fs")
const mkdirp = require("mkdirp")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Upload folder path
    },
    filename: function (req, file, cb) {
      cb(null, 'filled.pdf'); // Filename of the uploaded file
    },
  });
  const uploadPdf = multer({ storage });
  




exports.uploadPdf = uploadPdf;