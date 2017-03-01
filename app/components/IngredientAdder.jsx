import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import { compose, withState } from 'recompose';
import R from 'ramda';

const units = [ 'ml', 'g', 'tsp', 'tbsp', 'stk' ];
// mapOr :: (a -> b) -> (a -> b) -> a -> b
const mapOr = R.curry((fn, els, x) => R.ifElse(R.isNil, els, fn)(x));
// f :: [Ingredient] -> str -> [str]
const f = R.curry(
  (xs, ingredient) =>
    R.pipe(R.find(R.propEq('text', ingredient)), mapOr(i => [ i.unit ], R.always(units)))(xs)
);
export default compose(
  withState('ingredient', 'setIngredient', ''),
  withState('amount', 'setAmount', ''),
  withState('unit', 'setUnit', '')
)(
  class extends React.Component {
    reset() {
      let p = this.props;
      p.setIngredient('');
      p.setAmount('');
      p.setUnit('');
      this.refs.ingredient.focus();
    }
    render() {
      const p = this.props;
      return (
        <div
          className="content"
          style={{ display: 'flex', marginLeft: 16, marginRight: 16, marginTop: -24 }}
        >
          <AutoComplete
            floatingLabelText={'Ingredient'}
            filter={AutoComplete.fuzzyFilter}
            dataSource={p.ingredientList}
            maxSearchResults={2}
            fullWidth={true}
            ref="ingredient"
            onNewRequest={(cr, i) => {
                console.log('hi', cr, i);
                this.refs.amount.focus();
              }}
            searchText={p.ingredient}
            onUpdateInput={v => p.setIngredient(v)}
          />
          <AutoComplete
            floatingLabelText="Amount"
            fullWidth={true}
            dataSource={[]}
            style={{ marginLeft: 8, marginRight: 8 }}
            ref="amount"
            onNewRequest={(cr, i) => {
                console.log('hi', cr, i);
                this.refs.unit.focus();
              }}
            searchText={p.amount}
            onUpdateInput={v => p.setAmount(v)}
          />
          <AutoComplete
            floatingLabelText="Unit"
            filter={AutoComplete.fuzzyFilter}
            dataSource={f(p.ingredientList, p.ingredient)}
            searchText={p.unit}
            maxSearchResults={5}
            fullWidth={true}
            ref="unit"
            onUpdateInput={v => p.setUnit(v)}
            onNewRequest={(cr, i) => {
                let shouldCreateNewIngredient = R.isNil(
                  R.find(R.propEq('text', p.ingredient), p.ingredientList)
                );
                if (shouldCreateNewIngredient) {
                  p.createNewIngredient(p.ingredient, p.unit);
                }
                p.addIngredientAmount(p.ingredient, p.amount, p.unit);
                this.reset();
              }}
          />
          <div style={{ marginTop: 20,marginRight:-8,marginLeft:8 }}>
            <FloatingActionButton secondary={true} >
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      );
    }
  }
);
