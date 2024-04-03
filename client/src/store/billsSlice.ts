import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { Bill } from "../types/bills";

import {
  getAllBills,
  setBill,
  updateBill,
  deleteBill,
} from "../api/jsonServer";

const billsAdapter = createEntityAdapter({
  selectId: (bill: Bill) => bill.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const { getInitialState, addOne, setAll, removeOne, upsertOne } = billsAdapter;

export const getBills = createAsyncThunk("bills/setBills", async () => {
  const response = await getAllBills();
  return response;
});

export const billsSlice = createSlice({
  name: "bills",
  initialState: getInitialState(),
  reducers: {
    addBill: (state, action: PayloadAction<Bill>) => {
      addOne(state, action);
      setBill(action.payload);
    },

    upsertBill: (state, action: PayloadAction<Bill>) => {
      upsertOne(state, action);
      updateBill(action.payload.id, action.payload);
    },

    removeBill: (state, action: PayloadAction<number>) => {
      removeOne(state, action);
      deleteBill(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBills.fulfilled, (state, action) => {
      setAll(state, action);
    });
  },
});

export const { addBill, upsertBill, removeBill } = billsSlice.actions;

export const selectBills = (state: RootState) => state.bills;

export default billsSlice.reducer;
