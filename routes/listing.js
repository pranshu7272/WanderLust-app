const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");
const listingcontroller = require("../Controller/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});


router
  .route("/")
  .get(wrapAsync(listingcontroller.index))
  .post(
    isLoggedIn, 
    upload.single("listing[image]"),
    validateListing,
    wrapAsync (listingcontroller.creatListing)
  );

 // New Route
 router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingcontroller.showListing))
  .put(
    isLoggedIn, 
    isOwner, 
    upload.single("listing[image]"),
    validateListing, 
    wrapAsync(listingcontroller.updateListing))
  .delete(isLoggedIn, wrapAsync(listingcontroller.destroyListing));


// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingcontroller.EditListing));


module.exports = router;