import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { userReducer } from './slices/user';
import { orderReducer } from './slices/order';
import { profileOrdersReducer } from './slices/profile-orders';
import { constructorReducer } from './slices/constructor';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  profileOrders: profileOrdersReducer,
  constructor: constructorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
