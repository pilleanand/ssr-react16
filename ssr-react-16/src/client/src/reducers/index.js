'use strict';

import { combineReducers } from 'redux';
import commonReducers from './commonReducers';
import aboutReducers from '../pages/about/reducers/aboutReducers';

export default combineReducers({
  about: aboutReducers,
  common: commonReducers
});
