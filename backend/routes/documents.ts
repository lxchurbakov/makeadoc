const express = require('express');
const { route } = require('../libs/utils');
const path = require('path');
const { ObjectId, Document } = require('../libs/mongo');

const documents = express.Router({ mergeParams: true });

const ejspdf = require('@swensson/ejspdf');

documents.post('/', route(async (req, res) => {
    const { templateId, meta } = req.body;
    const { insertedId } = await Document.insertOne({ templateId, meta });

    return insertedId;
}));

documents.get('/', route(async (req, res) => {
    return Document.find({}).toArray();
    // const skip = Number(req.query.skip);
    // const limit = Number(req.query.limit);

    // if (isNaN(skip) || isNaN(limit) || skip < 0 || limit < 1) {
    //     throw new HttpError(400, 'invalid_params');
    // }

    // return Knowledge.find({}).skip(skip).limit(limit).toArray();
}));

documents.get('/:id/pdf', async (req, res) => {
    const id = req.params.id;
    const document = await Document.findOne({ _id: ObjectId(id) });



    // if !document

    const { templateId, meta } = document;
    const content = await ejspdf.ejs(path.resolve(__dirname, `../templates/${templateId}`), 8001, meta.fields);

    res.set('Content-Type', 'application/pdf');
    res.write(content);
    res.end();

    // const { templateId, meta } = req.body;
    // const { insertedId } = await Document.insertOne({ templateId, meta });

    // return insertedId;
});

export { documents };
