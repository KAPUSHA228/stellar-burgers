import { FC, memo, useMemo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '@app-store';
import { TConstructorIngredient } from '@utils-types';
import { getUser, moveDown, moveUp, removeIngredient } from '@slices';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dis = useDispatch();
    const handleMoveDown = () => {
      dis(moveDown(index));
    };

    const handleMoveUp = () => {
      dis(moveUp(index));
    };
    const handleClose = () => {
      dis(removeIngredient(ingredient.id));
    };

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
