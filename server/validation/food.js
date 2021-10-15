import joi from "joi";

export const ValidateRestaurantID = (resId) => {
  const Schema = joi.object({
    _id: joi.string().required(),
  });
  return Schema.validateAsync(resId);
};

export const ValidateCategory = (category) => {
  const Schema = joi.object({
    _id: joi.string().required(),
  });
  return Schema.validateAsync(category);
};
