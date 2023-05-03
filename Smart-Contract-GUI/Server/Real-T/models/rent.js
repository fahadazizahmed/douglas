const mongoose = require('mongoose');

const RentSchema = new mongoose.Schema({

    month: { type: String, required: true },
    propertyID: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    paid: { type: Boolean, required: false },


  

})

const RealT_DB = mongoose.connection.useDb('real-t');
const rentModel = RealT_DB.model('Rent', RentSchema);
module.exports = rentModel;