const User = require("../models/User");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide an email and a password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const resetPassword = async (req, res) => {
  const { email, old_password, new_password } = req.body;
  if (!email || !old_password || !new_password) {
    throw new BadRequestError("Please provide a password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(old_password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const hashedPassword = await user.hashPassword(new_password);

  const user_new = await User.findOneAndUpdate(
    { _id: user._id },
    { password: hashedPassword }
  );

  const token = user_new.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const changeUsername = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    throw new BadRequestError(
      "Please provide an email, a username and a password"
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const user_new = await User.findOneAndUpdate(
    { _id: user._id },
    { name: username }
  );

  const token = user_new.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user_new.name }, token });
};

module.exports = {
  register,
  login,
  resetPassword,
  changeUsername,
};
