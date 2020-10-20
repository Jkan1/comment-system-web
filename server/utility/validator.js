const Joi = require('joi');

const constants = require('../utility/constants');

exports.getComments = function (req, res, next) {
    let schema = Joi.object({
        isComment: Joi.boolean().optional(),
        id: Joi.string().max(100).optional()
    })

    let validation = schema.validate(req.query);
    if (validation.error) {
        let errorReason =
            validation.error.details != undefined
                ? validation.error.details[0].message.replace(/[*][?][a-z]|[A-Z]|[0-9]\"/g, validation.error.details[0].path[0])
                : constants.RESPONSE_MESSAGES.PARAMETER_MISSING;
        console.log("Validation Error");
        return constants.sendResponse(res, errorReason, 400);
    }
    next();
};

exports.postComments = function (req, res, next) {
    let schema = Joi.object({
        data: Joi.string().max(500).required(),
        user: Joi.string().max(20).required(),
        isComment: Joi.boolean().required(),
        isDeleted: Joi.boolean().optional(),
        id: Joi.string().max(100).optional(),
        threadId: Joi.string().max(100).optional()
    })

    let validation = schema.validate(req.body);
    if (validation.error) {
        let errorReason =
            validation.error.details != undefined
                ? validation.error.details[0].message.replace(/[*][?][a-z]|[A-Z]|[0-9]\"/g, validation.error.details[0].path[0])
                : constants.RESPONSE_MESSAGES.PARAMETER_MISSING;
        console.log("Validation Error");
        return constants.sendResponse(res, errorReason, 400);
    }
    next();
};