const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50, minlength: 1 },
    description: { type: String, required: true, minlength: 1 },
    address: { type: String, minlength: 1 },
    image: { type: String, required: true, minlength: 4 },
    price: { type: Number, required: true, min: 0 },
    available: { type: Boolean, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sold: { type: Boolean, required: false },
    wpId: { type: String, required: false },
    zillowLink: { type: String, required: false },
    propertyContractID: { type: String, required: false },
    agreementDocs: { type: String, required: false },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },


})

const RealT_DB = mongoose.connection.useDb('real-t');
const listingModel = RealT_DB.model('Listing', ListingSchema);
module.exports = listingModel;