const CustomAPIError = require('./custom-error')
const BadRequest = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const { METHOD_FAILURE } = require('http-status-codes')


module.exports = {
    CustomAPIError,
    BadRequest,
    UnauthenticatedError,
    NotFoundError
}
