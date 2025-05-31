import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { createOrder, closeOrderModal } from '../../services/slices/order';
import { Modal } from '../modal/modal';
import { OrderDetailsUI } from '../ui/order-details/order-details';
import {
  BuyBurgerThunk,
  clearConstructor,
  getConstructorIngredients,
  getName,
  getOrderData,
  getStatusBuyBurger
} from '@slices';

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
    <>
      <BurgerConstructorUI
        price={price}
        orderRequest={loading}
        constructorItems={constructorItems}
        orderModalData={order}
        onOrderClick={onOrderClick}
        closeOrderModal={handleCloseModal}
      />
      {isModalOpen && (
        <Modal title='Номер заказа' onClose={handleCloseModal}>
          {order && <OrderDetailsUI orderNumber={order.number} />}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </Modal>
      )}
    </>
  );
};
