//@flow
import {ADD_INGREDIENT, ADD_RECIPE, REM_RECIPE, UPDATE_INGREDIENT} from './types';
import {combineReducers} from 'redux';
import {append, findIndex, lensIndex, propEq, reject, set} from 'ramda';

const _ingredientList = [
  {text: 'Spaghetti', value: 'someFirstValue', unit: 'stk', shopItems: []},
  {text: 'Basmati Rice', value: 'someFirstValue', unit: 'stk', shopItems: []},
  {text: 'Parmesan', value: 'someFirstValue', unit: 'stk', shopItems: []},
  {text: 'Egg', value: 'someFirstValue', unit: 'stk', shopItems: []},
  {text: 'Whole Canned Tomatoes', value: 'someFirstValue', unit: 'stk', shopItems: []}
];
const _recipeList = [
  {
    title: 'Plain rice',
    description: 'just plain rice',
    ingredients: [ {ingredient: 'Basmati Rice', amount: 100, unit: 'g'} ]
  }
];

const ingredientList = (state = _ingredientList, action) => {
  switch (action.type) {
  case ADD_INGREDIENT: {
    const {ingredient, unit} = action;

    return [ ...state, {text: ingredient, value: '', unit, shopItems: []} ];
  }
  case UPDATE_INGREDIENT: {
    const {text, newIng} = action;
    const idx = findIndex(propEq('text', text), state);

    return set(lensIndex(idx), newIng, state);
  }
  default:
    return state;
  }
};

const recipeList = (state = _recipeList, action) => {
  switch (action.type) {
  case ADD_RECIPE: {
    const {recipe} = action;

    return append(recipe, state);
  }
  case REM_RECIPE: {
    const {recipeID} = action;

    return reject(propEq('title', recipeID), state);
  }
  default:
    return state;
  }
};

const todoApp = combineReducers({ingredientList, recipeList});

export default todoApp;
