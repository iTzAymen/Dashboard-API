const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    msg: "Something went wrong, please try again",
    err,
  });
};

module.exports = errorHandlerMiddleware;
