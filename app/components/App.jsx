import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import CreateRecipe from './CreateRecipe';
import Recipes from './Recipes';
import Ingredients from './Ingredients';
import CreateShopItem from './CreateShopItem';
import Home from './Home';
import reducer from '../reducers/app';
import { addIngredient, addRecipe, remRecipe, updateIngredient } from '../actions/app';
import { compose, withState } from 'recompose';
import { AppBar, Drawer, IconButton, MenuItem } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons/index';
import { curry, find, propEq } from 'ramda';

const mapStateToProps = state => state;
const mapStateToProps2 = (state, ownProps) => ({
  ing: find(propEq('text', ownProps.params.title))(state.ingredientList)
});

const mapDispatchToProps = dispatch => ({
  addIngredient: (ingredient, unit) => {
    dispatch(addIngredient(ingredient, unit));
  },
  updateIngredient: (text, newIng) => {
    dispatch(updateIngredient(text, newIng));
  },
  addRecipe: recipe => {
    dispatch(addRecipe(recipe));
  },
  remRecipe: recipeID => {
    dispatch(remRecipe(recipeID));
  }
});
const h = curry((obj, p) => {
  return obj[p.location.pathname];
});

const title = h({ '/recipes': 'Recipes', '/ingredients': 'Ingredients' });
const tap = fn => (...other) => {
  //console.log(...other);
  return fn(...other);
};
const AppBarContainer = compose(withState('open', 'setOpen', false))(
  tap(p => (
    <div id="content">
      <AppBar title={title(p)} onLeftIconButtonTouchTap={() => p.setOpen(!p.open)} />
      <Drawer docked={false} width={300} open={p.open} onRequestChange={open => p.setOpen(open)}>
        <AppBar
          title={title(p)}
          onLeftIconButtonTouchTap={() => p.setOpen(!p.open)}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        />
        <MenuItem
          onTouchTap={() => {
              p.setOpen(false);
              p.router.push('/recipes');
            }}
        >Recipes</MenuItem>
        <MenuItem
          onTouchTap={() => {
              p.setOpen(false);
              p.router.push('/ingredients');
            }}
        >Ingredients</MenuItem>
      </Drawer>
      {p.children}
    </div>
  ))
);
let store = createStore(reducer);
export default class extends React.Component {
  render() {
    let p = this.props;

    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={AppBarContainer}>
            <IndexRoute component={Home} />
            <Route
              path="/recipes"
              component={connect(mapStateToProps, mapDispatchToProps)(Recipes)}
            />
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
  }
}
