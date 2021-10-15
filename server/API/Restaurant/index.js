// libraries
import express from "express";

// database model
import { RestaurantModel } from "../../database/allModels";
//validation
import {
  ValidateRestaurantCity,
  ValidateRestaurantSearchString,
} from "../../validation/restaurant";
import { ValidateRestaurantID } from "../../validation/food";

const Router = express.Router();

/*
Route:          /
Description:    get all the restaurant details based in city
Params          none 
Access          Public
Method          Get 
*/
Router.get("/", async (req, res) => {
  try {
    await ValidateRestaurantCity(req.query);
    const { city } = req.query;
    const restaurants = await RestaurantModel.find({ city });

    return res.json({ restaurants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
Route:      /
Description: get individual restaurant details based on id
Params      id
Access      Public
Method      get 
*/

Router.get("/:id", async (req, res) => {
  try {
    await ValidateRestaurantID(req.params);
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findOne(_id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant Not Found" });
    return res.json({ restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
Route:      /search
Description: get restaurant details based on search string
Params      id
Body        searchString
Access      Public
Method      get 
*/
Router.get("/search", async (req, res) => {
  try {
    await ValidateRestaurantSearchString(req.body);
    const { searchString } = req.body;
    const restaurant = await RestaurantModel.find({
      name: { $regex: searchString, $options: "i" },
    });
    if (!restaurant)
      return res
        .status(404)
        .json({ error: `No Restaurant Matched ${searchString}` });
    return res.json({ restaurants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default Router;
