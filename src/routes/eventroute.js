var express = require("express");
var eventroute = express.Router();
const {
  dbGet,
  dbPost,
  dbPut,
  dbDelete,
} = require("../controller/eventController.js");

eventroute.route("/").get(dbGet).post(dbPost);
eventroute.route("/:id").put(dbPut).delete(dbDelete);

module.exports = {
  eventroute,
};
