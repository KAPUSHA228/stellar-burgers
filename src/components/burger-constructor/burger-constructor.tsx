import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  BuyBurgerThunk,
  clearConstructor,
  getConstructorIngredients,
  getName,
  getOrderData,
  getStatusBuyBurger
} from '@slices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@app-store';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorIngredients);
  const dis = useDispatch();
  const navi = useNavigate();
  const orderRequest = useSelector(getStatusBuyBurger);
  const name = useSelector(getName);
  const orderModalData = useSelector(getOrderData);

  const onOrderClick = () => {
    if (!name) {
      navi('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    dis(
      BuyBurgerThunk([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dis(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
