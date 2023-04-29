import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toggleModal } from "../modal/modalSlice";

const initialState = {
  isLoading: false,
  cartItems: [],
  total: 0,
  amount: 0,
};

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      thunkAPI.dispatch(toggleModal());
      const res = await axios(url);
      thunkAPI.dispatch(toggleModal());

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("i know what went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    toggleQty: (state, action) => {
      const { id, type } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);

      item.amount = type === "increase" ? item.amount + 1 : item.amount - 1;
    },
    calculateTotals: (state) => {
      const { total, amount } = state.cartItems.reduce(
        (acc, item) => {
          acc.total += item.price * item.amount;
          acc.amount += item.amount;
          return acc;
        },
        { total: 0, amount: 0 }
      );

      state.total = total.toFixed(2);
      state.amount = amount;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const { clearCart, toggleQty, removeItem, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
