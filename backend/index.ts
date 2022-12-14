const fs = require('fs');
const express = require('express');

// const unzip = require('unzip');
const decompress = require('decompress');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());

// Routes go here

app.post('/templates', upload.single('file'), (req, res) => {
    const templateZip = req.file;
    
    // if (!templateZip)

    // Rename file to add zip extension
    fs.rename(templateZip.path, templateZip.path + '.zip', (err) => {
        // if err
        decompress(templateZip.path + '.zip', "templates")
            .then((files) => {
                console.log(files);
            })
            .catch((error) => {
                console.log(error);
            });

        // const name = templateZip.originalname.split('.')[0];
// 
        // fs.createReadStream(templateZip.path).pipe(unzip.Extract({ path: `templates/${name}` }));
        console.log(err)
    });


    // console.log(templateZip)

    // fieldname: 'file',
    // originalname: 'example-template.zip',
    // encoding: '7bit',
    // mimetype: 'application/zip',
    // destination: 'uploads/',
    // filename: 'd0baa1b02e90d2fd8684ac0c56bc9335',
    // path: 'uploads/d0baa1b02e90d2fd8684ac0c56bc9335',
    // size: 184

    
    

    


    // console.log(req);
    res.json('ok');
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// Error handling

app.use((err, req, res, next) => {
    if (!!err.statusCode) {
        res.status(err.statusCode).json(err.body || null);
    } else {
        console.error(err.toString());
        res.status(500).json('server_error');
    }
});

// Start server

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
  