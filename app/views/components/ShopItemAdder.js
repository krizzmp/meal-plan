// @flow
import React from 'react';
import {AutoComplete, FloatingActionButton} from 'material-ui';
import {ContentAdd} from 'material-ui/svg-icons';

export default class ShopItemAdder extends React.Component {
  state = {
    price: '',
    amount: ''
  }
  _price:any;
  _amount:any;
  props:{
    addShopItem: Function
  }
  reset() {
    this.setState(() => ({
      price: '',
      amount: ''
    }));
    this._price.focus();
  }
  _handlePriceEnter() {
    this._amount.focus();
  }
  _handlePriceChange(v:string) {
    this.setState(() => ({
      price: v
    }));
  }
  _handleAmountEnter() {
    this.props.addShopItem(this.state.price, this.state.amount);
    this.reset();
  }
  _handleAmountChange(v:string) {
    this.setState(() => ({
      amount: v
    }));
  }
  _refPrice(priceElement:any) {
    this._price = priceElement;
  }

  _refAmount(amountElement:any) {
    this._amount = amountElement;
  }
  render() {
    return (
      <div
        className="content"
        style={{display: 'flex', marginLeft: 16, marginRight: 16, marginTop: -24}}
      >
        <AutoComplete
          floatingLabelText={'price'}
          filter={AutoComplete.fuzzyFilter}
          dataSource={[]}
          maxSearchResults={2}
          fullWidth={true}
          ref={this._refPrice.bind(this)}
          onNewRequest={this._handlePriceEnter.bind(this)}
          searchText={this.state.price}
          onUpdateInput={this._handlePriceChange.bind(this)}
        />
        <AutoComplete
          floatingLabelText="Amount"
          filter={AutoComplete.fuzzyFilter}
          dataSource={[]}
          searchText={this.state.amount}
          fullWidth={true}
          ref={this._refAmount.bind(this)}
          onUpdateInput={this._handleAmountChange.bind(this)}
          onNewRequest={this._handleAmountEnter.bind(this)}
        />
        <div style={{marginTop: 20, marginRight: -8, marginLeft: 8}}>
          <FloatingActionButton secondary={true}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}