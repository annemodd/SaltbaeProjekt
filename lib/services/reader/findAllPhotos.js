const { MongoClient } = require('mongodb');

const findAllPhotos = (connectionString) => (filename, size, type) =>
    MongoClient
        .connect(connectionString)
        .then((db) => {
            const collection = db.collection('photos');

            return collection
                .find()
                .sort({uploadedAt: -1})
                .toArray();
        });

module.exports.findAllPhotos = findAllPhotos;