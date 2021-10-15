//Libraries
require("dotenv").config;
import express from "express";
import passport from "passport";
import multer from "multer";

//Database model
import { ImageModel } from "../../database/allModels";

//Utilities
import { s3Upload } from "../../AWS/s3";

const Router = express.Router();

//multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
Route     /
Des       Get Image details
Params    _id
Access    Public
Method    GET  
*/
Router.get("/:_id", async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params._id);

    return res.json({ image });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route:          /
Description:    Uploading given image to S3 bucket,and then saving 
Params          none 
Access          Public
Method          Get 
*/

Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    //S3 bucket options
    const bucketOptions = {
      Bucket: "myzomatobucket",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const uploadImage = await s3Upload(bucketOptions);
    // return res.status(200).json({ file });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
