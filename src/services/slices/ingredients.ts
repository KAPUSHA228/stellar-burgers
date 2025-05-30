import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

interface IngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    fetchIngredientsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchIngredientsSuccess(state, action: PayloadAction<TIngredient[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchIngredientsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchIngredientsStart,
  fetchIngredientsSuccess,
  fetchIngredientsError
} = ingredientsSlice.actions;

export const fetchIngredients = () => async (dispatch: any) => {
  console.log('fetchIngredients called');
  try {
    dispatch(fetchIngredientsStart());
    const data = await getIngredientsApi();
    dispatch(fetchIngredientsSuccess(data));
  } catch (error: any) {
    dispatch(
      fetchIngredientsError(error.message || 'Ошибка загрузки ингредиентов')
    );
  }
};

export const ingredientsReducer = ingredientsSlice.reducer;
