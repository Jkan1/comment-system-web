const service = require('../service/service');
const constants = require('../utility/constants');

exports.getComments = getComments;
exports.postComments = postComments;

async function getComments(req, res) {
  try {
    let apiKey = req.headers ? req.headers['x-api-key'] : '';
    if (apiKey !== config.get('API_KEY')) {
      return constants.sendResponse(res, constants.RESPONSE_MESSAGES.INVALID_KEY, constants.RESPONSE_FLAGS.INVALID);
    }

    let result = await service.getComments(req.query);

    if (!result) {
      console.log("Not Found");
      return constants.sendResponse(res, constants.RESPONSE_MESSAGES.NOT_FOUND, constants.RESPONSE_FLAGS.NOT_FOUND);
    }

    console.log("Success");
    return constants.sendResponse(res, constants.RESPONSE_MESSAGES.SUCCESS, constants.RESPONSE_FLAGS.SUCCESS, result);

  } catch (error) {
    console.error(error);
    return constants.sendResponse(res, constants.RESPONSE_MESSAGES.SOMETHING_WENT_WRONG, constants.RESPONSE_FLAGS.SOMETHING_WENT_WRONG);
  }
}

async function postComments(req, res) {
  try {
    let apiKey = req.headers ? req.headers['x-api-key'] : '';
    if (apiKey !== config.get('API_KEY')) {
      return constants.sendResponse(res, constants.RESPONSE_MESSAGES.INVALID_KEY, constants.RESPONSE_FLAGS.INVALID);
    }

    if (req.body.isComment && !req.body.threadId) {
      return constants.sendResponse(res, constants.RESPONSE_MESSAGES.PARAMETER_MISSING, constants.RESPONSE_FLAGS.INVALID);
    }

    let result = await service.postComments(req.body);

    if (!result) {
      console.log("Not Found");
      return constants.sendResponse(res, constants.RESPONSE_MESSAGES.NOT_FOUND, constants.RESPONSE_FLAGS.NOT_FOUND);
    }

    console.log("Success");
    return constants.sendResponse(res, constants.RESPONSE_MESSAGES.SUCCESS, constants.RESPONSE_FLAGS.SUCCESS, result);

  } catch (error) {
    console.error(error);
    return constants.sendResponse(res, constants.RESPONSE_MESSAGES.SOMETHING_WENT_WRONG, constants.RESPONSE_FLAGS.SOMETHING_WENT_WRONG);
  }
}
