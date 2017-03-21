import React, {PropTypes as pt} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardHeader} from 'material-ui/Card';
import IngredientAdder from '../components/IngredientAdder.jsx';
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
  static propTypes = {
    router: pt.shape({push: pt.func}),
    title: pt.string,
    desc: pt.string,
    ingredients: pt.arrayOf(pt.string),
    ingredientList: pt.arrayOf(pt.string),
    addRecipe: pt.func,
    setTitle: pt.func,
    setDesc: pt.func,
    aia: pt.func,
    cni: pt.func,
    remIng: pt.func
  }
  _handleClose() {
    this.props.router.push('/recipes');
  }
  _handleSave() {
    let {title, desc, ingredients} = this.props;

    this.props.addRecipe({title, description: desc, ingredients});
    this.props.router.push('/recipes');
  }
  _handleTitleChange(e, v) {
    this.props.setTitle(v);
  }
  _handleDescriptionChange(e, v) {
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
