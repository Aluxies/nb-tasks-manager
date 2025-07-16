function buildBusinessResponse(data, status, message, hasError = false) {
    return {
        data,
        status,
        message,
        hasError
    }
}

module.exports = {
    buildBusinessResponse
}