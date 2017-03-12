import React, { PropTypes as pt } from 'react';
import { Subheader, List, ListItem } from 'material-ui';
import { grey500 } from 'material-ui/styles/colors';
import { setPropTypes } from 'recompose';
import { curry, map } from 'ramda';
const styles = { color: grey500, float: 'right' };

const ShopItemType = {};
const IngredientType = { text: pt.string, shopItems: pt.arrayOf(pt.shape(ShopItemType)) };
const c2pt = curry((pt, fn) => curry((p, tile) => fn(p, setPropTypes(pt)(tile))));

const Ingredient = c2pt(IngredientType)((p, tile) => (
  <ListItem
    key={tile.text}
    primaryText={
      <span>{tile.text} <span style={styles}>{tile.shopItems.length} shop items</span> </span>
    }
    onClick={() => p.router.push(`/ingredients/${tile.text}`)}
  />
));
export default setPropTypes({
  ingredientList: pt.arrayOf(pt.shape(IngredientType))
})(function IngredientList(p) {
  return (
    <div id="content">
      <div>
        <List>
          <Subheader>Ingredients</Subheader>
          {map(Ingredient(p), p.ingredientList)}
        </List>
      </div>
    </div>
  );
});
