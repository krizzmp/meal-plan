import React from 'react';
import { Card, CardHeader, List, ListItem } from 'material-ui';
const style = {
  item: { height: 48, lineHeight: '48px', borderBottom: '1px solid #E0E0E0', paddingLeft: 24 },
  card: { margin: 8 }
};
const t = [ { t: 'Trip name' }, { t: 'Location' }, { t: 'Start and end dates' } ];
const ExpItem = i => (
  <div className="item" style={style.item}>
    {i.t}
  </div>
);
export default p => (
  <div id="content" style={{ padding: 8, background: '#EEE' }}>
    <Card style={style.card}>
      {t.map(ExpItem)}
    </Card>
    <Card style={style.card}>
      <div className="item" >
        Hello
      </div>
    </Card>
    <Card style={style.card}>
      {t.map(ExpItem)}
    </Card>
  </div>
);
