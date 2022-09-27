const CustomAPIError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauth')
const NotFoundError = require('./not-found')

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
    UnauthenticatedError
}