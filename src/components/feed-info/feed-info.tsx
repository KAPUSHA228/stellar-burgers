import { FC } from 'react';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector((state) => state.feeds.feeds.orders);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  const feed = {};

  const burgerConstructor = useSelector((state) => state.constructor);

  const user = useSelector((state) => state.user.user);

  const { id } = useParams();
  const items = useSelector((state) => state.ingredients.items);
  const ingredientData = items.find((item) => item._id === id);

  const orderData = useSelector((state) => state.order.order);
  const ingredients = useSelector((state) => state.ingredients.items);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
