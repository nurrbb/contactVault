const express = require("express");
const router = express.Router();
const {getContacts,createContact,getContact,UpdateContact,deleteContact} = require("../controllers/contectController");

router.route("/").get(getContacts).post(createContact);

router.route("/:id").put(getContact).put(UpdateContact).delete(deleteContact);

module.exports = router;