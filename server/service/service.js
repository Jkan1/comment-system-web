const Models = require('../models');

exports.getComments = getComments;
exports.postComments = postComments;

async function getComments(requestData) {
    try {
        let result;
        let criteria = {}
        if (requestData && requestData.id) {
            criteria._id = requestData.id
            result = await Models.Message.findOne(criteria).populate({ path: 'comments' });
            result = result.comments;
        }else {
            criteria.isComment = false;
            result = await Models.Message.find(criteria);
        }
        return result;

    } catch (error) {
        console.error(error);
        return null;
    }
}

async function postComments(requestObject) {
    try {

        const newMessage = await Models.Message.create(requestObject)
        if (requestObject.isComment)
            await Models.Message.findOneAndUpdate({ _id: requestObject.threadId }, { $push: { comments: newMessage._id } })
        return newMessage;

    } catch (error) {
        console.error(error);
        return null;
    }
}