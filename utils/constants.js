module.exports = {
  ERROR: {
    EMAIL_EXIST:'The email already exist',
    INVALID_USER_ID: 'Please enter a valid user id',
    INTERNAL_ERROR :'Internal error, please try again later',
    INCORRECT_DATA_LOGIN_ACCESS : 'Your email or password is incorrect',
    USER_EXIST: 'The user already exist',
    USER_NOT_FOUND: 'User not found'
  },

  AUTH: {
    EXPIRED_TOKEN: "Token expired",
    INVALID_TOKEN: "Invalid token",
    LOGIN_FAILED: "Incorrect data authentication",
    NO_AUTHENTICATION_HEADER: "No authentication header provided",
    UN_AUTHORIZED: 'Unauthorized to do this',
    INVALID_TOKEN_FORMAT: 'Not valid token format'
  },

  INFO: {

  },
  
  SUCCESS: {
    USER_CREATED : 'Your account has been created successfully',
  },

  BACKUP: {
    SAVED: 'Backup saved',
    INVALID_PAGE_ID: 'Invalid page id'
  },

  //STATUS CODE

  STATUS_CODE: {
    'SUCCESS': 200,
    'CREATED': 201,
    'BAD_REQUEST': 400,
    'UNAUTHORIZED': 401,
    'INTERNAL_ERROR_CODE': 500,
    'DUPLICATED': 11000
  }
  
}
