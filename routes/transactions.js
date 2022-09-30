const express = require("express");
const router = express.Router();
const {
  getAllData,
  getSmallData,
  getOnePage,
  getOverviewData,
  getDailyData,
  validateDate,
  searchByID,
} = require("../controllers/transactions");

router.route("/").get(searchByID);

router.route("/page/:page").get(getOnePage);

router.route("/overview").get(getOverviewData);

router.route("/daily").post(getDailyData);

router.route("/validate").post(validateDate);

module.exports = router;
