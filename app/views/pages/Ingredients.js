// @flow
import React from 'react';
import {Subheader, List, ListItem} from 'material-ui';
import {grey500} from 'material-ui/styles/colors';
import {map} from 'ramda';

const styles = {color: grey500, float: 'right'};

type ShopItemType = {};
type IngredientType = {
  text: string,
  shopItems: ShopItemType[]
};

class Ingredient extends React.Component {
  props:{
    tile:IngredientType,
    router:{
      push:(url:string)=>void
    }
  }
  _handleClick() {
    this.props.router.push(`/ingredients/${this.props.tile.text}`);
  }
  render() {
    return (
      <ListItem
        key={this.props.tile.text}
        primaryText={
          <span>{this.props.tile.text} <span style={styles}>{this.props.tile.shopItems.length} shop items</span> </span>
        }
        onClick={this._handleClick.bind(this)}
      />
    );
  }
}

export default class Ingredients extends React.Component {
  props:{
    ingredientList: IngredientType[],
    router:{
      push:(url:string)=>void
    }
  }
  render() {
    return (
      <div id="content">
        <div>
          <List>
            <Subheader>Ingredients</Subheader>
            {map((t) => (<Ingredient tile={t} router={this.props.router} />), this.props.ingredientList)}
          </List>
        </div>
      </div>
    );
  }
}