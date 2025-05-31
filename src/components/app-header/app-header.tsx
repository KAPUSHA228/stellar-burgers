import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@app-store';
import { getName } from '@slices';

export const AppHeader: FC = () => {
  const userName = useSelector(getName);
  return <AppHeaderUI userName={userName} />;
};
