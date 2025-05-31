import { FC, memo, useMemo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '../../utils/types';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/constructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const { bun, ingredients } = useSelector((state) => state.constructor) || {
      bun: null,
      ingredients: []
    };
    const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
    const dispatch = useDispatch();
    const handleMoveDown = useCallback(() => {
      dispatch(moveIngredient({ from: index, to: index + 1 }));
    }, [dispatch, index]);

    const handleMoveUp = useCallback(() => {
      dispatch(moveIngredient({ from: index, to: index - 1 }));
    }, [dispatch, index]);

    const handleClose = useCallback(() => {
      dispatch(removeIngredient(ingredient.id));
    }, [dispatch, ingredient.id]);
    const price = useMemo(
      () =>
        (bun ? bun.price * 2 : 0) +
        safeIngredients.reduce(
          (s: number, v: TConstructorIngredient) => s + v.price,
          0
        ),
      [bun, safeIngredients]
    );

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
