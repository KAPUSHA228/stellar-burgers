import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@app-store';
import { FeedsThunk, getOrders } from '@slices';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getOrders);
  const dis = useDispatch();
  const updateFeeds = () => {
    dis(FeedsThunk());
  };
  useEffect(() => {
    const number = setInterval(updateFeeds, 2000);
    return () => clearInterval(number);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        updateFeeds();
      }}
    />
  );
};
