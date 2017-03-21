// @flow
import React from 'react';
import {Card} from 'material-ui';

const style = {
  item: {height: 48, lineHeight: '48px', borderBottom: '1px solid #E0E0E0', paddingLeft: 24},
  card: {margin: 8}
};
const t = [ {t: 'Trip name'}, {t: 'Location'}, {t: 'Start and end dates'} ];
const expItem = (i) => (
  <div className="item" style={style.item}>
    {i.t}
  </div>
);

export default class Home extends React.PureComponent {
  render() {
    return (
      <div id="content" style={{padding: 8, background: '#EEE'}}>
        <Card style={style.card}>
          {t.map(expItem)}
        </Card>
        <Card style={style.card}>
          <div className="item" >
            Hello
          </div>
        </Card>
        <Card style={style.card}>
          {t.map(expItem)}
        </Card>
      </div>
    );
  }
}
