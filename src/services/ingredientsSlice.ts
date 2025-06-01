import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const IngredientsThunk = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(IngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(IngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(IngredientsThunk.rejected, (state, action) => {
        state.loading = false;
        console.error(state, action);
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    ingredientstIsLoading: (state) => state.loading
  }
});

export const { getIngredients, ingredientstIsLoading } =
  ingredientsSlice.selectors;
export { initialState as initialStateIngredients };
