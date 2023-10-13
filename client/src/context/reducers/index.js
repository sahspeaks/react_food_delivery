import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducers";
import productReducer from "./productReducer";
import allUserReducer from "./allUsersReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";
import ordersReducer from "./ordersReducer";

const myReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
  allUsers: allUserReducer,
  cart: cartReducer,
  isCart: displayCartReducer,
  orders: ordersReducer,
});
export default myReducer;
