// @flow
import React from 'react';
import {NavigationMoreVert, ContentAdd} from 'material-ui/svg-icons';
import {grey400} from 'material-ui/styles/colors';
import {
  IconButton,
  IconMenu,
  MenuItem,
  FloatingActionButton,
  Subheader,
  List,
  ListItem
} from 'material-ui';
import {curry} from 'ramda';

const iconButtonElement = (
  <IconButton touch={true}>
    <NavigationMoreVert color={grey400} />
  </IconButton>
);
const rightIconMenu = (remRecipe) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={remRecipe}>Delete</MenuItem>
  </IconMenu>
);
const recipe = curry((remRecipe, tile) => (
  <ListItem
    key={tile.title}
    rightIconButton={rightIconMenu(() => remRecipe(tile.title))}
    primaryText={tile.title}
    secondaryText={tile.description}
    secondaryTextLines={1}
  />
));

export default class Recipes extends React.Component {
  props:{
    recipeList:any,
    router:any,
    remRecipe:any
  }
  _handleAddRecipe() {
    this.props.router.push('/recipes/create');
  }
  render() {
    return (
      <div id="content">
        <div>
          <List>
            <Subheader>Recipes</Subheader>
            {this.props.recipeList.map(recipe(this.props.remRecipe))}
          </List>
        </div>
        <div style={{right: 40, bottom: 40, position: 'fixed', zIndex: '1'}}>
          <FloatingActionButton secondary={true} onClick={this._handleAddRecipe.bind(this)}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}