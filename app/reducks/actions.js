//@flow
import * as types from './types';

export const addIngredient = (ingredient, unit) => ({
  type: types.ADD_INGREDIENT,
  ingredient,
  unit
});
export const updateIngredient = (text, newIng) => ({
  type: types.UPDATE_INGREDIENT,
  text,
  newIng
});
export const addRecipe = (recipe) => ({
  type: types.ADD_RECIPE,
  recipe
});
export const remRecipe = (recipeID) => ({
  type: types.REM_RECIPE,
  recipeID
});
