// @flow
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardHeader} from 'material-ui/Card';
import {NavigationClose} from 'material-ui/svg-icons';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {AppBar, FlatButton, IconButton, IconMenu, MenuItem, TextField} from 'material-ui';
import {grey400} from 'material-ui/styles/colors';
import {curry, remove} from 'ramda';
import ShopItemAdder from '../components/ShopItemAdder';

const iconButtonElement = (
  <IconButton touch={true}>
    <MoreVertIcon color={grey400} />
  </IconButton>
);
const rightIconMenu = (remIngredient) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={remIngredient}>Delete</MenuItem>
  </IconMenu>
);
const li = curry((unit, remIngredient, i, idx) => (
  <ListItem
    primaryText={`${i.amount}${unit} for ${i.price}dkk`}
    rightIconButton={rightIconMenu(() => remIngredient(idx))}
  />
));

type Props = {
  defaultIng:{
    shopItems:any[],
    text:string,
    unit:string
  },
  updateIngredient:Function,
  router:{
    push: (url:string) => void
  }
}
export default class CreateShopItem extends React.Component {
  constructor(props:Props, context:any) {
    super(props, context);
    this.state = {
      shopItems: props.defaultIng.shopItems,
      title: props.defaultIng.text,
      desc: props.defaultIng.unit,
    };
  }
  state:{
    shopItems:mixed[],
    title:string,
    desc:string
  }
  props:Props
  aia(price:string, amount:string) {
    this.setState(() => ({
      shopItems: [
        ...this.state.shopItems,
        {
          price,
          amount
        }
      ]
    }));
  }
  remIng(idx:number) {
    this.setState(() => ({
      shopItems: remove(idx, 1, this.state.shopItems)
    }));
  }
  _handleSave() {
    const {title, desc, shopItems} = this.state;

    this.props.updateIngredient(title, {text: title, value: '', shopItems, unit: desc});
    this.props.router.push('/ingredients');
  }
  _handleTitleChange(e:any, v:string) {
    this.setState(() => ({title: v}));
  }
  _handleDescChange(e:any, v:string) {
    this.setState(() => ({desc: v}));
  }
  _handleClose() {
    this.props.router.push('/ingredients');
  }
  render() {
    return (
      <div id="content">
        <AppBar
          title=""
          iconElementLeft={(
            <IconButton onClick={this._handleClose.bind(this)}>
              <NavigationClose />
            </IconButton>
          )}
          iconElementRight={(
            <FlatButton
              label="Save"
              onClick={this._handleSave.bind(this)}
            />
          )}
        />
        <div className="content" style={{marginLeft: 16, marginRight: 16}}>
          <TextField
            floatingLabelText="Title"
            fullWidth={true}
            value={this.state.title}
            onChange={this._handleTitleChange.bind(this)}
          />
          <TextField
            floatingLabelText="Description"
            multiLine={true}
            fullWidth={true}
            rows={1}
            value={this.state.desc}
            onChange={this._handleDescChange.bind(this)}
          />
        </div>
        <Card style={{marginLeft: 16, marginRight: 16, marginTop: 16}}>
          <CardHeader title="Shop Items" />
          <ShopItemAdder addShopItem={this.aia.bind(this)} />
          <List>
            {this.state.shopItems.map(li(this.props.defaultIng.unit, (id) => this.remIng(id)))}
          </List>
        </Card>
      </div>
    );
  }
}

