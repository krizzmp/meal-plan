//@flow
import React from 'react';
import {AutoComplete, FloatingActionButton} from 'material-ui';
import {ContentAdd} from 'material-ui/svg-icons';
import R from 'ramda';

const units = [ 'ml', 'g', 'tsp', 'tbsp', 'stk' ];
// mapOr :: (a -> b) -> (a -> b) -> a -> b
const mapOr = R.curry((fn, els, x) => R.ifElse(R.isNil, els, fn)(x));
// f :: [Ingredient] -> str -> [str]
const f = R.curry(
  (xs, ingredient) =>
    R.pipe(R.find(R.propEq('text', ingredient)), mapOr((i) => [ i.unit ], R.always(units)))(xs)
);

export default class IngredientAdder extends React.Component {
  state = {
    ingredient: '',
    amount: '',
    unit: '',
  }
  props:{
    ingredientList:any[],
    createNewIngredient:Function,
    addIngredientAmount:Function
  }
  _ingredient:any
  _amount:any
  _unit:any
  reset() {
    this.setState(() => ({
      ingredient: '',
      amount: '',
      unit: ''
    }));
    this._ingredient.focus();
  }
  _handleIngredientEnter() {
    this._amount.focus();
  }
  _handleAmountEnter() {
    this._unit.focus();
  }
  _handleIngredientChange(v:string) {
    this.setState(() => ({
      ingredient: v
    }));
  }
  _handleAmountChange(v:string) {
    this.setState(() => ({
      amount: v
    }));
  }
  _handleUnitChange(v:string) {
    this.setState(() => ({
      unit: v
    }));
  }
  _handleUnitEnter() {
    let shouldCreateNewIngredient = R.isNil(
      R.find(R.propEq('text', this.state.ingredient), this.props.ingredientList)
    );

    if(shouldCreateNewIngredient) {
      this.props.createNewIngredient(this.state.ingredient, this.state.unit);
    }
    this.props.addIngredientAmount(this.state.ingredient, this.state.amount, this.state.unit);
    this.reset();
  }
  _refIngredient(ingredientElement:any) {
    this._ingredient = ingredientElement;
  }
  _refAmount(amountElement:any) {
    this._amount = amountElement;
  }
  _refUnit(unitElement:any) {
    this._unit = unitElement;
  }
  render() {
    return (
      <div
        className="content"
        style={{display: 'flex', marginLeft: 16, marginRight: 16, marginTop: -24}}
      >
        <AutoComplete
          floatingLabelText={'Ingredient'}
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.props.ingredientList}
          maxSearchResults={2}
          fullWidth={true}
          ref={this._refIngredient.bind(this)}
          onNewRequest={this._handleIngredientEnter.bind(this)}
          searchText={this.state.ingredient}
          onUpdateInput={this._handleIngredientChange.bind(this)}
        />
        <AutoComplete
          floatingLabelText="Amount"
          fullWidth={true}
          dataSource={[]}
          style={{marginLeft: 8, marginRight: 8}}
          ref={this._refAmount.bind(this)}
          onNewRequest={this._handleAmountEnter.bind(this)}
          searchText={this.state.amount}
          onUpdateInput={this._handleAmountChange.bind(this)}
        />
        <AutoComplete
          floatingLabelText="Unit"
          filter={AutoComplete.fuzzyFilter}
          dataSource={f(this.props.ingredientList, this.state.ingredient)}
          searchText={this.state.unit}
          maxSearchResults={5}
          fullWidth={true}
          ref={this._refUnit.bind(this)}
          onUpdateInput={this._handleUnitChange.bind(this)}
          onNewRequest={this._handleUnitEnter.bind(this)}
        />
        <div style={{marginTop: 20, marginRight: -8, marginLeft: 8}}>
          <FloatingActionButton secondary={true} >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}