import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import toggleCartReducer from "../features/cart/cartToggle";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  toggleCart: toggleCartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
