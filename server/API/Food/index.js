//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { FoodModel } from "../../database/allModels";
//validation
import { ValidateRestaurantID, ValidateCategory } from "../../validation/food";

const Router = express.Router();

/*
Route            /r
Des              Get all the foods based on particular restaurant
Params           _id
Access           Public
Method           GET
*/

Router.get("/r:_id", async (req, res) => {
  try {
    await ValidateRestaurantID(req.params);
    const { _id } = req.params;
    const foods = await FoodModel.find({ restaurant: _id });

    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route     /:_id
Des       Get food based on id
Params    _id
Access    Public
Method    GET  
*/
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const foods = await FoodModel.findById(_id);

    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route            /c
Des              Get all the foods based on particular category
Params           category
Access           Public
Method           GET
*/

Router.get("/r/:category", async (req, res) => {
  try {
    await ValidateCategory(req.params);
    const { category } = req.params;
    const foods = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });

    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
