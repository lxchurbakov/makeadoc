const express = require('express');

const fs = require('fs');
const decompress = require('decompress');
const multer  = require('multer');
const YAML = require('yaml');

const { route, HttpError } = require('../libs/utils');
const { ObjectId, Template } = require('../libs/mongo');

const upload = multer({ dest: 'uploads/' });

const templates = express.Router({ mergeParams: true });

const readFile = (path: string) => new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

templates.post('/', upload.single('file'), route(async (req, _res) => {
    const rawTemplateZip = req.file;
    const name = req.body.name;

    if (!rawTemplateZip) { throw new HttpError(400, 'template_not_uploaded'); }
    if (!name) { throw new HttpError(400, 'name_not_defined'); }

    const { insertedId } = await Template.insertOne({ type: 'genuine', status: 'parsing', name });

    try {
        await decompress(rawTemplateZip.path, `templates/${insertedId}`);

        // Now we try to look for yaml file
        const yaml = await readFile(`templates/${insertedId}/index.yaml`);
        const meta = YAML.parse(yaml.toString());

        await Template.updateOne({
            _id: ObjectId(insertedId),
        }, {
            $set: { status: 'good', meta }
        });
    } catch (e) {
        await Template.updateOne({
            _id: ObjectId(insertedId),
        }, {
            $set: { status: 'bad', error: e.toString() }
        });

        throw new HttpError(400, `template_parsing_failed`);
    }

    return Template.findOne({ _id: ObjectId(insertedId), });
}));

templates.get('/', route(async (req, res) => {
    return Template.find({}).toArray();
}));

templates.delete('/:id', route(async (req, res) => {
    const { deletedCount } = await Template.deleteOne({ _id: ObjectId(req.params.id) })

    if (deletedCount === 0) {
        throw new HttpError(404, 'not_found');
    }

    return null;
}));

export { templates };