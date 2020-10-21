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
        } else {
            criteria.isComment = false;
            result = await Models.Message.find(criteria).sort({ _id: -1 }).populate('comments').populate({ path: 'comments.comments' });
            result = await Models.Message.populate(result, { path: 'comments.comments' });
        }
        return result;

    } catch (error) {
        console.error(error);
        return [];
    }
}

async function postComments(requestObject) {
    try {

        if(requestObject.id){
            const update = { data: requestObject.data};
            if (requestObject.isDeleted != null){
                update.isDeleted = requestObject.isDeleted;
            }
            const result = await Models.Message.findOneAndUpdate({ _id: requestObject.id }, update);
            return result;
        }

        const newMessage = await Models.Message.create(requestObject)
        if (requestObject.isComment)
            await Models.Message.findOneAndUpdate({ _id: requestObject.threadId }, { $push: { comments: newMessage._id } })
        return newMessage;

    } catch (error) {
        console.error(error);
        return null;
    }
}