// libraries
import express from "express";

// database model
import { ReviewModel } from "../../database/allModels";

const Router = express.Router();
/*
Route     /
Des       Get all review
Params    resid
BODY      none
Access    Public
Method    GET  
*/
Router.get("/:resid", async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ restaurant: req.params.resid });
    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route:          /new
Description:    Add new food review/rating
Params          none 
Body            review object
Access          Public
Method          POST
*/
Router.post("/new", async (req, res) => {
  try {
    const { _id } = req.session.passport.user._doc;
    const { reviewData } = req.body;
    await ReviewModel.create(reviewData);
    return res.json({ review: "Successfully Created Review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route:          /delete
Description:    Delete your review
Params          _id
Access          Public
Method          DELETE 
*/
Router.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ReviewModel.findByIdAndDelete(_id);
    return res.json({ review: "Successfully Deleted the Review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default Router;
