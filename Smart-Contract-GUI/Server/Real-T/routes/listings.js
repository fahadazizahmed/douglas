const router = require('express').Router();
const listingModel = require('../models/listing');
const userModel = require('../models/users');
const rentModel = require('../models/rent');
const authenticated = require('../middleware/authorization').authenticated();
const multer = require('../middleware/multer');
const multer1 = require('../middleware/multer1');
const multer3 = require('../middleware/multer3');
const axios = require('axios');
const { createWriteStream, createReadStream } = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

const path = require("path")
const fs1 = require("fs")
const mkdirp = require("mkdirp")
const fs = require('fs').promises;



// Handle POST request to save the PDF file
router.post('/save-pdf', multer3.uploadPdf.single('pdf'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    // Read the uploaded file and write it to the upload folder
    const source = createReadStream(file.path);
    const destination = createWriteStream(`./uploads/${file.filename}`);
    source.pipe(destination);

    res.send('File uploaded successfully');
});




// Don't forget to create the images folder first

// Add a new listing
// router.post('/', authenticated, multer.upload.single('image'), async (req, res, next) => {
//     console.log("body",req.body)
//     const url = req.protocol + '://' + req.get('host');
//     const image = url + '/static/public/images/' + req.file.filename;
//     try {
//         const { name, description, price, zillowLink } = req.body;
//         const listing = await listingModel.create({
//             name,
//             image,
//             description,
//             price,
//             owner: req.user,
//             available: true,
//             sold: false,
//             zillowLink
//         });
//         await userModel.findByIdAndUpdate(req.user,{$push: {"listings": listing._id} });
//         const insertInWPresult = await axios.get(process.env.WP_ADD_PRODUCT, {
//             params: {
//                 product_id: listing._id.toString().replace(/^"(.*)"$/, '$1'),
//                 token_name: name,
//                 original_price: price,
//                 product_author: req.user,
//                 product_img: image,
//                 category: "Property",
//             }
//         }); 
//         console.log('WP: ',insertInWPresult);
//         res.send(listing)
//     } catch (e){
//         console.log(e);
//         next("Erorr while adding a listing");
//     }
// });




router.post('/', authenticated, async (req, res, next) => {
    console.log("authenticated", req.user)
    multer1.uploadFile1.single('image')(req, res, (err) => {
        if (err) {
            console.log("ress", err)
            res.send({ message: "File suze is to large.Upload some other picture" })
        }
        else { next() }
    })
}, async (req, res, next) => {
    console.log("My Body", req.body)

    try {
        let find = await userModel.findOne({ _id: req.user })
        // Load the PDF file
        const file = await fs.readFile(`./uploads/contractPdf/${req.body.docs}`);

        // Create a new PDF document object
        const pdfDoc = await PDFDocument.load(file);

        // Get the first page of the document
        const page = pdfDoc.getPages()[0];

        // Draw some text on the page
        page.drawText(find.firstName, {
            x: 160,
            y: 643,
            size: 12,

        });

        page.drawText(req.body.price + " Ether", {
            x: 457,
            y: 495,
            size: 12,

        });

        page.drawText(req.body.address, {
            x: 290,
            y: 525,
            size: 12,

        });

        // Save the modified document
        const pdfBytes = await pdfDoc.save();

        // Write the modified file to disk
        if (!fs1.existsSync(`./uploads/agreement/${req.user}`)) {
            await mkdirp.sync(`./uploads/agreement/${req.user}`)
        }
        let pdfFileName = `${req.user}/modified-${Date.now()}.pdf`
        await fs.writeFile(`./uploads/agreement/${pdfFileName}`, pdfBytes);
        const image = `${req.user}/${req.file.filename}`

        console.log("My Body", req.body)
        const { name, description, price, zillowLink, propertyHash, address, coordniates, lat, lng } = req.body;
        const listing = await listingModel.create({
            name,
            image,
            description,
            price,
            owner: req.user,
            available: true,
            sold: false,
            address,
            zillowLink,
            propertyContractID: propertyHash,
            agreementDocs: pdfFileName,
            // coordniates,
            latitude: lat,
            longitude: lng
        });
        await userModel.findByIdAndUpdate(req.user, { $push: { "listings": listing._id } });
        const insertInWPresult = await axios.get(process.env.WP_ADD_PRODUCT, {
            params: {
                product_id: listing._id.toString().replace(/^"(.*)"$/, '$1'),
                token_name: name,
                original_price: price,
                product_author: req.user,
                product_img: image,
                category: "Property",
            }
        });
        console.log('WP: ', insertInWPresult);
        res.send(listing)
    } catch (e) {
        console.log(e);
        next("Erorr while adding a listing");
    }
});




router.post('/edit', authenticated, async (req, res, next) => {
    console.log("authenticated", req.user)
    multer1.uploadFile1.single('image')(req, res, (err) => {
        if (err) {
            console.log("ress", err)
            res.send({ message: "File suze is to large.Upload some other picture" })
        }
        else { next() }
    })
}, async (req, res, next) => {
    console.log("My Body", req.body)

    try {
        let find = await userModel.findOne({ _id: req.user })
        // Load the PDF file
        const file = await fs.readFile(`./uploads/contractPdf/${req.body.docs}`);

        // Create a new PDF document object
        const pdfDoc = await PDFDocument.load(file);

        // Get the first page of the document
        const page = pdfDoc.getPages()[0];

        // Draw some text on the page
        page.drawText(find.firstName, {
            x: 160,
            y: 643,
            size: 12,

        });

        page.drawText(req.body.price + " Ether", {
            x: 457,
            y: 495,
            size: 12,

        });

        page.drawText(req.body.address, {
            x: 290,
            y: 525,
            size: 12,

        });

        // Save the modified document
        const pdfBytes = await pdfDoc.save();

        // Write the modified file to disk
        if (!fs1.existsSync(`./uploads/agreement/${req.user}`)) {
            await mkdirp.sync(`./uploads/agreement/${req.user}`)
        }
        let pdfFileName = `${req.user}/modified-${Date.now()}.pdf`
        await fs.writeFile(`./uploads/agreement/${pdfFileName}`, pdfBytes);
        const image = `${req.user}/${req.file.filename}`

        console.log("My Body", req.body)
        const { name, description, price, zillowLink, propertyHash, address, imageLink, id } = req.body;
        console.log("Reeee", req.body)
        if (imageLink === "") {

        }

        // const listingId = id; // Replace with the actual listing ID

        // const filter = { _id: listingId }; // Filter to find the listing by its ID

        // const update = {
        //     $set: {
        //         name,
        //         image,
        //         description,
        //         price,
        //         owner: req.user,
        //         available: true,
        //         sold: false,
        //         address,
        //         zillowLink,
        //         propertyContractID: propertyHash,
        //         agreementDocs: pdfFileName,
        //     },
        // };

        // const options = { new: true }; // Set `new` option to return the updated listing

        // const updatedListing = await listingModel.findOneAndUpdate(filter, update, options);



        // const insertInWPresult = await axios.get(process.env.WP_ADD_PRODUCT, {
        //     params: {
        //         product_id: listing._id.toString().replace(/^"(.*)"$/, '$1'),
        //         token_name: name,
        //         original_price: price,
        //         product_author: req.user,
        //         product_img: image,
        //         category: "Property",
        //     }
        // });
        // console.log('WP: ', insertInWPresult);
        res.send("updated")
    } catch (e) {
        console.log(e);
        next("Erorr while adding a listing");
    }
});



















// Get all listings
router.get('/', async (req, res, next) => {
    console.log("req.user", req.user)
    try {
        const listings = await listingModel.find({ available: true, sold: false }).populate({ path: "owner", model: userModel, select: { "password": 0 } }).sort({ "_id": -1 });
        res.send(listings);
    } catch (err) {
        next("Internal server error: Couldn't get available listings");
    }
});

// Get all listings for a user
router.get('/user/:id', async (req, res, next) => {
    try {
        const listings = await listingModel.find({ owner: req.params.id }).sort({ "_id": -1 });
        res.send(listings);
    } catch (err) {
        next("Internal server error: Couldn't get listings for this user");
    }
});

// Get all listings for a user by username
router.get('/personal/:username', async (req, res, next) => {
    try {
        const user = await userModel.findOne({ username: req.params.username.toLowerCase() });
        if (user) {
            const listings = await listingModel.find({ available: true, owner: user._id }).populate({ path: "owner", model: userModel, select: { "password": 0 } }).sort({ "_id": -1 });
            res.send(listings);
        } else {
            res.sendStatus(402);
        }
    } catch (err) {
        console.log(err)
        next("Internal server error: Couldn't get listings for this user");
    }
});


// Get a specific listing
router.get('/:id', async (req, res, next) => {
    try {
        const listing = await listingModel.findOne({ _id: req.params.id }).populate({ path: "owner", model: userModel, select: { "password": 0 } });
        res.send(listing);
    } catch (err) {
        next("Internal server error: Couldn't get listing");
    }
});

// Update a listing
router.patch('/:id', authenticated, async (req, res, next) => {
    console.log("authenticated", req.user)
    multer1.uploadFile1.single('image')(req, res, (err) => {
        if (err) {
            console.log("ress", err)
            errorResponse(res, err.message, 400)
        }
        else { next() }
    })
}, async (req, res, next) => {


    // const url = req.protocol + '://' + req.get('host');
    const image = `${req.user}/${req.file.filename}`
    console.log("Req.body", req.body)
    let contructObject = {
        _id: req.body._id,
        name: req.body.name,
        image: image,
        description: req.body.description,
        price: parseFloat(req.body.price),
        owner: req.body.owner,
        available: req.body.available,
        sold: req.body.sold,
        zillowLink: req.body.zillowLink,
        propertyContractID: req.body.propertyContractID[req.body.propertyContractID.length - 1]
    }
    console.log("contructObject", contructObject)

    try {

        const listing = await listingModel.findOneAndUpdate({ _id: req.params.id, owner: req.user }, { $set: contructObject }, { new: true, runValidators: true })
        if (!listing) next("listing not found");
        const WPresult = await axios.get(process.env.WP_UPDATE_PRODUCT, {
            params: {
                product_id: listing._id.toString().replace(/^"(.*)"$/, '$1'),
                token_name: req.body.name || listing.name,
                original_price: req.body.price || listing.price,
                product_author: req.user,
                product_img: req.body.image || listing.image,
            }
        });
        console.log('WP: ', WPresult);
        res.json(listing);
    } catch (e) {
        console.log(e);
        next("Error in editing a listing")
    }
});

// Delete a listing
router.delete('/:id', authenticated, async (req, res, next) => {
    try {
        const listing = await listingModel.findOneAndDelete({ _id: req.params.id, owner: req.user });
        if (!listing) next("listing not found");
        const WPresult = await axios.get(process.env.WP_DELETE_PRODUCT, {
            params: {
                product_id: listing._id.toString().replace(/^"(.*)"$/, '$1')
            }
        });
        console.log('WP: ', WPresult);
        res.json(listing);
    } catch (e) {
        console.log(e);
        next("Error in removing a listing")
    }
});

// Get all listings
router.get('/myList/:id', async (req, res, next) => {
    console.log("i am heree", req.params.id)

    try {
        const listings = await listingModel.find({ available: true, owner: req.params.id }).populate({ path: "owner", model: userModel, select: { "password": 0 } }).sort({ "_id": -1 });
        res.send(listings);
    } catch (err) {
        next("Internal server error: Couldn't get available listings");
    }
});

// Get a specifi property
router.get('/property/:id', async (req, res, next) => {

    try {
        const listings = await listingModel.find({ _id: req.params.id });
        res.send(listings);
    } catch (err) {
        next("Internal server error: Couldn't get available listings");
    }
});



// Get all listings
router.get('/listByUser/getAll', authenticated, async (req, res, next) => {
    console.log("req.user", req.user)
    try {
        let find = await userModel.findOne({ _id: req.user })
        console.log("find", find.purchased)
        const listings = await listingModel.find({ _id: { $in: find.purchased } }).populate({ path: "owner", model: userModel, select: { "password": 0 } }).sort({ "_id": -1 });
        res.send(listings);
    } catch (err) {
        console.log("Errro", err)
        next("Internal server error: Couldn't get available listings");
    }
});


router.post('/user/payRent', authenticated, async (req, res, next) => {
    console.log("Reeee", req.user, req.body)
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        console.log("currentMonth", currentMonth)
        let find = await rentModel.findOne({ propertyID: req.body.propertyID })

        if (find) {
            if (find.month === currentMonth.toString() && find.paid === true) {
                console.log("i ma here")
                return res.status(200).send({ message: "Rent already paid" })
            }
            if (find.month === currentMonth.toString() && find.paid === false) {
                console.log("i ma here")
                return res.status(200).send({ message: "Rent should paid" })
            }
            if (find.month !== currentMonth.toString()) {
                return res.status(200).send({ message: "Rent should paid" })
            }
        }
        else {
            await rentModel.create({
                userID: req.user,
                propertyID: req.body.propertyID,
                month: currentMonth,
                paid: true
            });
        }
        return res.status(200).send({ message: "Rent paid successfully" })

    }
    catch (err) {
        console.log("Errro", err)
        next("Internal server error: Couldn't get available listings");
    }
});


router.post('/user/updateRent', authenticated, async (req, res, next) => {
    console.log("Reeee", req.user, req.body)
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        await rentModel.updateOne(
            { propertyID: req.body.propertyID },
            { $set: { month: currentMonth, paid: true } })
        return res.status(200).send({ message: "Rent paid successfully" })

    }
    catch (err) {
        console.log("Errro", err)
        next("Internal server error: Couldn't get available listings");
    }
});

// Get a specific listing
router.get('/edit/:id', authenticated, async (req, res, next) => {
    console.log("ffff", req.params)
    try {
        const listing = await listingModel.findOne({ _id: req.params.id });
        console.log("Listying")
        res.send(listing);
    } catch (err) {
        next("Internal server error: Couldn't get listing");
    }
});


module.exports = router
