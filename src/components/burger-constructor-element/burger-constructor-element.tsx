import { FC, memo, useMemo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector } from '../../services/store';
import { TConstructorIngredient } from '../../utils/types';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const { bun, ingredients } = useSelector((state) => state.constructor) || {
      bun: null,
      ingredients: []
    };
    const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
    const handleMoveDown = () => {};

    const handleMoveUp = () => {};

    const handleClose = () => {};

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
