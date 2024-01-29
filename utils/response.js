exports.successResponse = function(res, message, status) {
  const statusError = [400, 500, 501, 11000]
  if(statusError.includes(status)){
    res.status(status || 400).send({
      error_message: message
    })
  } else {
    res.status(status || 200).send({
      responseData: message
    })
  }
}

exports.errorResponse = function(res, message, status) {
  res.status(status || 500).send({
    error: true,
    message: message
  })
}