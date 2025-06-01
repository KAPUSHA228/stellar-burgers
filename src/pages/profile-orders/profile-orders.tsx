import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@app-store';
import { getUserOrders, userOrdersThunk, isload } from '@slices';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getUserOrders);
  const isDataSuccess: boolean = useSelector(isload);
  const dis = useDispatch();
  useEffect(() => {
    dis(userOrdersThunk());
  }, []);

  if (isDataSuccess) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
