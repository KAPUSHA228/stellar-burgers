import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { createOrder, closeOrderModal } from '../../services/slices/order';
import { Modal } from '../modal/modal';
import { OrderDetailsUI } from '../ui/order-details/order-details';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients = [] } = useSelector((state) => state.constructor);
  const { user } = useSelector((state) => state.user);
  const { order, loading, error, isModalOpen } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!bun || loading) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];
    dispatch(createOrder(ingredientIds));
  };

  const handleCloseModal = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  const constructorItems = useMemo(
    () => ({
      bun,
      ingredients
    }),
    [bun, ingredients]
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
