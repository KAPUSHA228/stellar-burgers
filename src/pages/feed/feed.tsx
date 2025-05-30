import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from '../../services/store';

export const Feed: FC = () => {
  // Берём заказы из Redux
  const orders = useSelector((state) => state.profileOrders.orders);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
