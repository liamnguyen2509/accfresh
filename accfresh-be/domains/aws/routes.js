const express = require('express');
const router = express.Router();
const aws = require("aws-sdk");

const { responseJSON } = require('../../util/responseJSON');
const { adminAuthVerification } = require('../../util/jwt');

router.get("/sign-s3", async (req, res) => {
    let { authorization } = req.headers;
    adminAuthVerification(authorization)
    .then(async () => {
        const s3 = new aws.S3({
            secretAccessKey: process.env.AWS_SECRET_KEY,
            accessKeyId: process.env.AWS_ACCESS_KEY,
            region: process.env.AWS_REGION
        });

        const fileName = req.query["file-name"];
        const fileType = req.query["file-type"];
        const s3Params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Expires: 300,
            ContentType: fileType,
            ACL: "private"
        };

        var promise = s3.getSignedUrlPromise("putObject", s3Params);
        promise.then(function(url) {
            res.status(200).json(responseJSON('S', 'Get s3 url successful.', url));
        }, function(e) { 
            res.status(400).json(responseJSON('SWR', e.message));
        });
    })
    .catch((e) => {
        res.status(400).json(responseJSON('SWR', e.message));
    });
});

module.exports = router;

