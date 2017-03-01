export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';

export const ADD_RECIPE = 'ADD_RECIPE';
export const REM_RECIPE = 'REM_RECIPE';

export const addIngredient = (ingredient, unit) => ({ type: ADD_INGREDIENT, ingredient, unit });
export const updateIngredient = (text, newIng) => ({ type: UPDATE_INGREDIENT, text, newIng });
export const addRecipe = recipe => ({ type: ADD_RECIPE, recipe });
export const remRecipe = recipeID => ({ type: REM_RECIPE, recipeID });
