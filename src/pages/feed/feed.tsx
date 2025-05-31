import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { FeedsThunk } from '@slices';

export const Feed: FC = () => {
  // Берём заказы из Redux
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feeds.feeds.orders);

  if (!orders.length) {
    return <Preloader />;
  }
  const handleFeedUpdate = () => {
    dispatch(FeedsThunk());
  };
  return <FeedUI orders={orders} handleGetFeeds={handleFeedUpdate} />;
};
