import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card, CardHeader } from 'material-ui/Card';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { compose, withProps, withState } from 'recompose';
import IngredientAdder from './IngredientAdder';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { AppBar, FlatButton, IconButton, IconMenu, MenuItem, TextField } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';
import { curry, propEq, reject } from 'ramda';
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
const LI = curry((remIngredient, i) => (
  <ListItem
    primaryText={`${i.amount}${i.unit} ${i.ingredient}`}
    rightIconButton={rightIconMenu(() => remIngredient(i.ingredient))}
  />
));
const CreateRecipe = p => (
  <div id="content">
    <AppBar
      title="Spaghetti Carbonara"
      iconElementLeft={
        <IconButton onClick={() => p.router.push('/recipes')}><NavigationClose /></IconButton>
      }
      iconElementRight={(
          <FlatButton
            label="Save"
            onClick={() => {
                const { title, desc, ingredients } = p;
                p.addRecipe({ title, description: desc, ingredients });
                p.router.push('/recipes');
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
      <CardHeader title="Ingredients" />
      <IngredientAdder
        createNewIngredient={(a, b) => p.cni(a, b)}
        addIngredientAmount={(a, b, c) => p.aia(a, b, c)}
        ingredientList={p.ingredientList}
      />
      <List>
        {p.ingredients.map(LI(id => p.remIng(id)))}
      </List>
    </Card>
  </div>
);
export default compose(
  withState('ingredients', 'setIngredients', []),
  withState('title', 'setTitle', ''),
  withState('desc', 'setDesc', ''),
  withProps(p => ({
    cni: (ing, unit) => p.addIngredient(ing, unit),
    aia: (ing, amount, unit) =>
      p.setIngredients([ ...p.ingredients, { ingredient: ing, amount, unit } ]),
    remIng: id => p.setIngredients(reject(propEq('ingredient', id), p.ingredients))
  }))
)(CreateRecipe);
