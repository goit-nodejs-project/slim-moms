import { createSlice } from '@reduxjs/toolkit';
import { fetchDiary, addProduct, removeProduct } from './diaryOperations';

const today = new Date().toISOString().slice(0, 10);

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    products: [],
    date: today,
    summary: {
      totalCalories: 0,
      dailyRate: null,
      percentsOfDailyRate: null,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.dayInfo.eatenProducts;
        state.summary = {
          totalCalories: action.payload.dayInfo.daySummary.eatenCalories,
          dailyRate: action.payload.dailyCalories,
          percentsOfDailyRate: action.payload.percentOfNormal,
        };
      })
      .addCase(fetchDiary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload.eatenProducts;
        state.summary.totalCalories = action.payload.daySummary.eatenCalories;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        const removed = state.products.find(
          (p) => p._id === action.payload.id
        );
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id
        );
        if (removed) {
          state.summary.totalCalories = Math.max(
            0,
            (state.summary.totalCalories || 0) - removed.calories
          );
        }
      });
  },
});

export const { setDate } = diarySlice.actions;
export default diarySlice.reducer;
