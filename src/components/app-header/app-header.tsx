import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <AppHeaderUI userName={user?.name} onProfileClick={handleProfileClick} />
  );
};
