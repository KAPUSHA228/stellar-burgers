import { FC } from 'react';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getTotal, getTotalToday, getOrders as getOrders2 } from '@slices';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const tot = useSelector(getTotal);
  const totToday = useSelector(getTotalToday);
  const orders: TOrder[] = useSelector(getOrders2);
  const feed = {
    total: tot,
    totalToday: totToday
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
