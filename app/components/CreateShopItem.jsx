import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card, CardHeader } from 'material-ui/Card';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { compose, withState } from 'recompose';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { AppBar, FlatButton, IconButton, IconMenu, MenuItem, TextField } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';
import {curry, remove} from 'ramda';
import ShopItemAdder from './ShopItemAdder';
const iconButtonElement = (
  <IconButton touch={true}>
    <MoreVertIcon color={grey400} />
  </IconButton>
);
const rightIconMenu = remIngredient => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={remIngredient}>Delete</MenuItem>
  </IconMenu>
);
const LI = curry((unit, remIngredient, i,idx) => (
  <ListItem
    primaryText={`${i.amount}${unit} for ${i.price}dkk`}
    rightIconButton={rightIconMenu(() => remIngredient(idx))}
  />
));
export default compose(
  withState('shopItems', 'setShopItems', p => p.ing.shopItems),
  withState('title', 'setTitle', p => p.ing.text),
  withState('desc', 'setDesc', p => p.ing.unit)
)(
  class extends React.Component {
    aia(price, amount) {
      this.props.setShopItems([ ...this.props.shopItems, { price, amount } ]);
    }
    remIng(idx) {
      this.props.setShopItems(remove(idx,1, this.props.shopItems));
    }
    render() {
      let p = this.props;
      return (
        <div id="content">
          <AppBar
            title=""
            iconElementLeft={(
                <IconButton onClick={() => p.router.push('/ingredients')}>
                  <NavigationClose />
                </IconButton>
              )}
            iconElementRight={(
                <FlatButton
                  label="Save"
                  onClick={() => {
                      const { title, desc, shopItems} = p;
                      p.updateIngredient(title,{ text:title, value: '', shopItems,unit:desc });
                      p.router.push('/ingredients');
                    }}
                />
              )}
          />
          <div className="content" style={{ marginLeft: 16, marginRight: 16 }}>
            <TextField
              floatingLabelText="Title"
              fullWidth={true}
              value={p.title}
              onChange={(e, v) => p.setTitle(v)}
            />
            <TextField
              floatingLabelText="Description"
              multiLine={true}
              fullWidth={true}
              rows={1}
              value={p.desc}
              onChange={(e, v) => p.setDesc(v)}
            />
          </div>
          <Card style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }}>
            <CardHeader title="Shop Items" />
            <ShopItemAdder addShopItem={(price, amount) => this.aia(price, amount)} />
            <List>
              {p.shopItems.map(LI(p.ing.unit, id => this.remIng(id)))}
            </List>
          </Card>
        </div>
      );
    }
  }
);
