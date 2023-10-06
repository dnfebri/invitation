import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  count: 0,
  barang: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    incrementTwo(state, action) {
      state.count = action.payload;
    },
    addBarang(state, action) {
      state.barang = action.payload;
    },
  },
});

export const { increment, decrement, incrementTwo, addBarang } =
  counterSlice.actions;

export default counterSlice.reducer;
