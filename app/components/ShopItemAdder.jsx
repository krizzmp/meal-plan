import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import { compose, withState } from 'recompose';
import R from 'ramda';

export default compose(withState('price', 'setPrice', ''), withState('amount', 'setAmount', ''))(
  class extends React.Component {
    reset() {
      let p = this.props;
      p.setPrice('');
      p.setAmount('');
      this.refs.price.focus();
    }
    render() {
      const p = this.props;
      return (
        <div
          className="content"
          style={{ display: 'flex', marginLeft: 16, marginRight: 16, marginTop: -24 }}
        >
          <AutoComplete
            floatingLabelText={'price'}
            filter={AutoComplete.fuzzyFilter}
            dataSource={[]}
            maxSearchResults={2}
            fullWidth={true}
            ref="price"
            onNewRequest={(cr, i) => {
                console.log('hi', cr, i);
                this.refs.amount.focus();
              }}
            searchText={p.price}
            onUpdateInput={v => p.setPrice(v)}
          />
          <AutoComplete
            floatingLabelText="Amount"
            filter={AutoComplete.fuzzyFilter}
            dataSource={[]}
            searchText={p.amount}
            fullWidth={true}
            ref="amount"
            onUpdateInput={v => p.setAmount(v)}
            onNewRequest={(cr, i) => {
              p.addShopItem(p.price,p.amount)
                this.reset();
              }}
          />
          <div style={{ marginTop: 20, marginRight: -8, marginLeft: 8 }}>
            <FloatingActionButton secondary={true}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      );
    }
  }
);
