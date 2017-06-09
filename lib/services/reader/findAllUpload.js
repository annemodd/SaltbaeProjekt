/**
 * @akoenig/hsb-sose17-webapp-uploads
 *
 * Copyright, 2017, André König <hello@andrekoenig.de>
 *
 * MIT licensed
 *
 */

const { MongoClient } = require('mongodb');

const findAllPhotos = (connectionString) => (filename, size, type) =>
    MongoClient
        .connect(connectionString)
        .then((db) => {
            const collection = db.collection('uploads');

            return collection
                .find()
                .sort({uploadedAt: -1})
                .toArray();
        });

module.exports.findAllPhotos = findAllPhotos;
