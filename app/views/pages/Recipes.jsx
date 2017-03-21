import React from 'react';
import { NavigationMoreVert, ContentAdd } from 'material-ui/svg-icons';
import { grey400 } from 'material-ui/styles/colors';
import {
  IconButton,
  IconMenu,
  MenuItem,
  FloatingActionButton,
  Subheader,
  List,
  ListItem
} from 'material-ui';
import { compose, withState } from 'recompose';
import { curry } from 'ramda';

const iconButtonElement = (
  <IconButton touch={true}>
    <NavigationMoreVert color={grey400} />
  </IconButton>
);
const rightIconMenu = remRecipe => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={remRecipe}>Delete</MenuItem>
  </IconMenu>
);
const Recipe = curry((remRecipe, tile) => (
  <ListItem
    key={tile.title}
    rightIconButton={rightIconMenu(() => remRecipe(tile.title))}
    primaryText={tile.title}
    secondaryText={tile.description}
    secondaryTextLines={1}
  />
));
export default compose(withState('open', 'setOpen', false))(p => (
  <div id="content">
    <div>
      <List>
        <Subheader>Recipes</Subheader>
        {p.recipeList.map(Recipe(p.remRecipe))}
      </List>
    </div>
    <div style={{ right: 40, bottom: 40, position: 'fixed', zIndex: '1' }}>
      <FloatingActionButton secondary={true} onClick={() => p.router.push('/recipes/create')}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </div>
));
