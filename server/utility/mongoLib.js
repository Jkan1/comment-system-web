const mongoose = require('mongoose');

var connect = function () {
    return new Promise((resolve, reject) => {

        const MONGO_USER = config.get("databaseSettings.mongoDb.user");
        const MONGO_PASSWORD = config.get("databaseSettings.mongoDb.password");
        const MONGO_HOST = config.get("databaseSettings.mongoDb.host");
        const MONGO_PORT = config.get("databaseSettings.mongoDb.port");
        const MONGO_DATABASE = config.get("databaseSettings.mongoDb.database");

        const MONGO_CONNECTION_URL = `mongodb://${(MONGO_USER && MONGO_PASSWORD ? (MONGO_USER + ":" + MONGO_PASSWORD + "@") : '')}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
        mongoose.connect(MONGO_CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, (error) => {
            if (error) {
                console.log(error);
                return reject(error);
            }
            console.log('--- Database connected ---');
            return resolve(true);
        });
    });
};
module.exports = {
    connect: connect
};
