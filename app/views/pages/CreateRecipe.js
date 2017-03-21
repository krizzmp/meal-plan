//@flow
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardHeader} from 'material-ui/Card';
import IngredientAdder from '../components/IngredientAdder';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {AppBar, FlatButton, IconButton, IconMenu, MenuItem, TextField} from 'material-ui';
import {grey400} from 'material-ui/styles/colors';
import {curry} from 'ramda';
import {NavigationClose} from 'material-ui/svg-icons/index';

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
const listItem = curry((remIngredient, i) => (
  <ListItem
    primaryText={`${i.amount}${i.unit} ${i.ingredient}`}
    rightIconButton={rightIconMenu(() => remIngredient(i.ingredient))}
  />
));

export default class CreateRecipe extends React.Component {
  props:{
    router:{
      push:(url:string)=>void
    },
    title:string,
    desc:string,
    ingredients:string[],
    ingredientList:string[],
    addRecipe:Function,
    setTitle:Function,
    setDesc:Function,
    aia:Function,
    cni:Function,
    remIng:Function,
  }
  _handleClose() {
    this.props.router.push('/recipes');
  }
  _handleSave() {
    let {title, desc, ingredients} = this.props;

    this.props.addRecipe({title, description: desc, ingredients});
    this.props.router.push('/recipes');
  }
  _handleTitleChange(e:any, v:string) {
    this.props.setTitle(v);
  }
  _handleDescriptionChange(e:any, v:string) {
    this.props.setDesc(v);
  }
  render() {
    return (
      <div id="content">
        <AppBar
          title="Spaghetti Carbonara"
          iconElementLeft={(
            <IconButton onClick={this._handleClose}>
              <NavigationClose />
            </IconButton>
          )}
          iconElementRight={(<FlatButton label="Save" onClick={this._handleSave} />)}
        />
        <div className="content" style={{marginLeft: 16, marginRight: 16}}>
          <TextField
            floatingLabelText="Title"
            fullWidth={true}
            value={this.props.title}
            onChange={this._handleTitleChange}
          />
          <TextField
            floatingLabelText="Description"
            multiLine={true}
            fullWidth={true}
            rows={1}
            value={this.props.desc}
            onChange={this._handleDescriptionChange}
          />

          <Card style={{marginTop: 16}}>
            <CardHeader title="Ingredients" />
            <IngredientAdder
              createNewIngredient={this.props.cni}
              addIngredientAmount={this.props.aia}
              ingredientList={this.props.ingredientList}
            />
            <List>
              {this.props.ingredients.map(listItem((id) => this.props.remIng(id)))}
            </List>
          </Card>
        </div>
      </div>
    );
  }
}
