// @flow
import reducer from './reducers';
import * as _duckActions from './actions';
import * as _duckTypes from './types';

//export { default as duckSelectors } from "./selectors";
//export { default as duckOperations } from "./operations";
export const duckActions = _duckActions;
export const duckTypes = _duckTypes;

export default reducer;