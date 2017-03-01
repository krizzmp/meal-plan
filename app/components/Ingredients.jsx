import React from 'react';
import { Subheader, List, ListItem } from 'material-ui';
import { curry } from 'ramda';
import { grey500 } from 'material-ui/styles/colors';
const styles = { color: grey500, float: 'right' };
const Ingredient = curry((p, tile) => (
  <ListItem
    key={tile.text}
    primaryText={
      <span>{tile.text} <span style={styles}>{tile.shopItems.length} shop items</span> </span>
    }
    onClick={() => p.router.push(`/ingredients/${tile.text}`)}
  />
));
export default p => (
  <div id="content">
    <div>
      <List>
        <Subheader>Ingredients</Subheader>
        {p.ingredientList.map(Ingredient(p))}
      </List>
    </div>
  </div>
);
