// @flow
import React from 'react';
import {AppBar, Drawer, IconButton, MenuItem} from 'material-ui';
import {NavigationClose} from 'material-ui/svg-icons/index';
import {curry} from 'ramda';

const h = curry((obj, p) => obj[p.location.pathname]);

const title = h({'/recipes': 'Recipes', '/ingredients': 'Ingredients'});

export default class AppBarContainer extends React.Component {
  state = {open: false}
  props:{
    router:{
      push:(url:string)=>void
    },
    children:Node[]
  }
  _toggleOpen() {
    this.setState((s) => ({open: !s.open}));
  }
  _setOpen(open:boolean) {
    this.setState(() => ({open}));
  }
  _handleThing(url:string) {
    return () => {
      this._setOpen(false);
      this.props.router.push(url);
    };
  }
  render() {
    return (
      <div id="content">
        <AppBar title={title(this.props)} onLeftIconButtonTouchTap={this._toggleOpen.bind(this)} />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={this._setOpen.bind(this)}
        >
          <AppBar
            title={title(this.props)}
            onLeftIconButtonTouchTap={this._toggleOpen.bind(this)}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          />
          <MenuItem onTouchTap={this._handleThing('/recipes')}>
            Recipes
          </MenuItem>
          <MenuItem onTouchTap={this._handleThing('/ingredients')}>
            Ingredients
          </MenuItem>
        </Drawer>
        {this.props.children}
      </div>
    );
  }
}

