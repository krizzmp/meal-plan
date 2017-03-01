import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card, CardHeader } from 'material-ui/Card';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { compose, withState } from 'recompose';
import IngredientAdder from './IngredientAdder';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { AppBar, FlatButton, IconButton, IconMenu, MenuItem, TextField } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';
import { propEq, reject } from 'ramda';
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
const LI = remIngredient =>
  i => (
    <ListItem
      primaryText={`${i.amount}${i.unit} ${i.ingredient}`}
      rightIconButton={rightIconMenu(() => remIngredient(i.ingredient))}
    />
  );
export default compose(
  withState('ingredients', 'setIngredients', []),
  withState('title', 'setTitle', ''),
  withState('desc', 'setDesc', '')
)(
  class extends React.Component {
    cni(ing, unit) {
      this.props.addIngredient(ing, unit);
    }
    aia(ing, amount, unit) {
      this.props.setIngredients([ ...this.props.ingredients, { ingredient: ing, amount, unit } ]);
    }
    remIng(id) {
      this.props.setIngredients(reject(propEq('ingredient', id), this.props.ingredients));
    }
    render() {
      let p = this.props;
      return (
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
              createNewIngredient={(a, b) => this.cni(a, b)}
              addIngredientAmount={(a, b, c) => this.aia(a, b, c)}
              ingredientList={p.ingredientList}
            />
            <List>
              {p.ingredients.map(LI(id => this.remIng(id)))}
            </List>
          </Card>
        </div>
      );
    }
  }
);
