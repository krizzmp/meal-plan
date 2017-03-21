// @flow
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {connect, Provider} from 'react-redux';
import {createStore} from 'redux';
import CreateRecipe from './CreateRecipe';
import Recipes from './Recipes';
import Ingredients from './Ingredients';
import CreateShopItem from './CreateShopItem';
import Home from './Home';
import reducer from '../../reducks/';
import {addIngredient, addRecipe, remRecipe, updateIngredient} from '../../reducks/actions';
import {find, propEq} from 'ramda';
import AppBarContainer from './AppBarContainer';

const mapStateToProps = (state) => state;
const mapStateToProps2 = (state, ownProps) => ({
  defaultIng: find(propEq('text', ownProps.params.title))(state.ingredientList)
});

const mapDispatchToProps = (dispatch) => ({
  addIngredient: (ingredient, unit) => {
    dispatch(addIngredient(ingredient, unit));
  },
  updateIngredient: (text, newIng) => {
    dispatch(updateIngredient(text, newIng));
  },
  addRecipe: (recipe) => {
    dispatch(addRecipe(recipe));
  },
  remRecipe: (recipeID) => {
    dispatch(remRecipe(recipeID));
  }
});


let store = createStore(reducer);
const App = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppBarContainer}>
        <IndexRoute component={Home} />
        <Route path="/recipes" component={connect(mapStateToProps, mapDispatchToProps)(Recipes)} />
        <Route
          path="/ingredients"
          component={connect(mapStateToProps, mapDispatchToProps)(Ingredients)}
        />
      </Route>
      <Route
        path="/recipes/create"
        component={connect(mapStateToProps, mapDispatchToProps)(CreateRecipe)}
      />
      <Route
        path="/ingredients/:title"
        component={connect(mapStateToProps2, mapDispatchToProps)(CreateShopItem)}
      />
    </Router>
  </Provider>
);

export default App;
