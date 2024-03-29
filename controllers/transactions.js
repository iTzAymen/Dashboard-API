const Transaction = require("../models/Transaction");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllData = async (req, res) => {
  console.log("getting data");
  const d = new Date();
  const transaction = await Transaction.find({});
  const t = new Date() - d;
  console.log(`getAllData successful after ${t} ms`);
  res.status(StatusCodes.OK).json({ success: true, data: transaction });
};

const getSmallData = async (req, res) => {
  console.log("getting small data");
  const d = new Date();
  const transaction = await Transaction.find({});

  let maxDate = null;
  let minDate = null;
  let dataset = [...transaction];
  dataset.forEach((value, index) => {
    const dateString = value["DATE DE CREATION"];
    const transactionDate = dateString ? new Date(dateString) : null;
    if (transactionDate && (!maxDate || transactionDate > maxDate)) {
      maxDate = transactionDate;
    }
    if (transactionDate && (!minDate || transactionDate < minDate)) {
      minDate = transactionDate;
    }
  });
  let newMinDate = maxDate;
  newMinDate.setMonth(newMinDate.getMonth() - 1);
  newMinDate = newMinDate < minDate ? minDate : newMinDate;
  const smallData = transaction.filter((data) => {
    const dateString = data["DATE DE CREATION"];
    const transactionDate = dateString ? new Date(dateString) : null;
    return transactionDate && transactionDate >= newMinDate;
  });
  console.log(smallData.length);
  const t = new Date() - d;
  console.log(`getSmallData successful after ${t} ms`);
  res.status(StatusCodes.OK).json({ success: true, data: smallData });
};

const getOnePage = async (req, res) => {
  console.log("getting one page");
  const { page } = req.params;
  let { id } = req.query;

  if (!id) {
    id = "";
  }

  const d = new Date();
  const transaction = await Transaction.find({
    "IDENTIFIANT DE TRANSACTION": { $regex: id },
  })
    .sort({ DATE_DE_DERNIERE_MODIFICATION: -1 })
    .skip(page * 10)
    .limit(10);
  const t = new Date() - d;
  console.log(`getOnePage successful after ${t} ms`);
  res.status(StatusCodes.OK).json({ success: true, data: transaction });
};

const searchByID = async (req, res) => {
  const { id } = req.query;
  console.log(`searching by ID ${id}`);

  if (!id) {
    throw new BadRequestError("no id provided");
  }

  const d = new Date();
  const transaction = await Transaction.find({
    "IDENTIFIANT DE TRANSACTION": { $regex: id },
  })
    .sort({ DATE_DE_DERNIERE_MODIFICATION: -1 })
    .limit(10);
  const t = new Date() - d;
  console.log(`searchByID successful after ${t} ms`);
  res.status(StatusCodes.OK).json({ success: true, data: transaction });
};

const getOverviewData = async (req, res) => {
  const total_count = await Transaction.aggregate([
    {
      $count: "count",
    },
  ]);
  const offer_count = await Transaction.aggregate([
    {
      $match: {
        PRODUIT: { $nin: ["NULL", ""] },
      },
    },
    {
      $group: {
        _id: "$PRODUIT",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  const city_count = await Transaction.aggregate([
    {
      $match: {
        WILAYA_PDV: { $nin: ["NULL", ""] },
      },
    },
    {
      $group: {
        _id: "$WILAYA_PDV",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    // {
    //   $limit: 6,
    // },
  ]);

  const refused_count = await Transaction.aggregate([
    {
      $match: {
        DESCRIPTION: { $regex: /(reject)/gi },
      },
    },
    {
      $count: "count",
    },
  ]);

  const transactions_count = await Transaction.aggregate([
    {
      $group: {
        _id: {
          $month: {
            $dateFromString: {
              dateString: "$DATE_DERNIERE_MODIFICATION",
              format: "%d/%m/%Y %H:%M:%S",
            },
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  data = {
    total_count,
    offer_count,
    city_count,
    refused_count,
    transactions_count,
  };
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getDailyData = async (req, res) => {
  const { date } = req.body;

  if (!date) {
    throw new BadRequestError("No date provided");
  }

  const date_now = date.split("T")[0];

  const total_count = await Transaction.aggregate([
    {
      $match: {
        DATE_DE_DERNIERE_MODIFICATION: { $regex: new RegExp(date_now, "gi") },
      },
    },
    {
      $count: "count",
    },
  ]);
  const offer_count = await Transaction.aggregate([
    {
      $match: {
        DATE_DE_DERNIERE_MODIFICATION: { $regex: new RegExp(date_now, "gi") },
        PRODUIT: { $nin: ["NULL", ""] },
      },
    },
    {
      $group: {
        _id: "$PRODUIT",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  const city_count = await Transaction.aggregate([
    {
      $match: {
        DATE_DE_DERNIERE_MODIFICATION: { $regex: new RegExp(date_now, "gi") },
        WILAYA_PDV: { $nin: ["NULL", ""] },
      },
    },
    {
      $group: {
        _id: "$WILAYA_PDV",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  const refused_count = await Transaction.aggregate([
    {
      $match: {
        DATE_DE_DERNIERE_MODIFICATION: { $regex: new RegExp(date_now, "gi") },
        DESCRIPTION: { $regex: /(reject)/gi },
      },
    },
    {
      $count: "count",
    },
  ]);

  const transactions_count = await Transaction.aggregate([
    {
      $match: {
        DATE_DE_DERNIERE_MODIFICATION: { $regex: new RegExp(date_now, "gi") },
      },
    },
    {
      $group: {
        _id: {
          $hour: {
            $dateFromString: { dateString: "$DATE_DE_DERNIERE_MODIFICATION" },
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  data = {
    total_count,
    offer_count,
    city_count,
    refused_count,
    transactions_count,
  };
  res.status(StatusCodes.OK).json({ success: true, data });
};

const validateDate = async (req, res) => {
  const { date } = req.body;

  if (!date) {
    throw new BadRequestError("No date provided");
  }

  const date_max = await Transaction.aggregate([
    {
      $sort: {
        DATE_DE_DERNIERE_MODIFICATION: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        date: "$DATE_DE_DERNIERE_MODIFICATION",
      },
    },
  ]);

  const date_min = await Transaction.aggregate([
    {
      $sort: {
        DATE_DE_DERNIERE_MODIFICATION: 1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        date: "$DATE_DE_DERNIERE_MODIFICATION",
      },
    },
  ]);

  const _date_min = new Date(date_min[0].date);
  const _date_max = new Date(date_max[0].date);
  const _date = new Date(date);

  const valid = _date <= _date_max && _date >= _date_min;

  const data = { valid, min: _date_min, max: _date_max };

  res.status(StatusCodes.OK).json({ success: true, data });
};

module.exports = {
  getAllData,
  getSmallData,
  getOnePage,
  getOverviewData,
  getDailyData,
  validateDate,
  searchByID,
};
