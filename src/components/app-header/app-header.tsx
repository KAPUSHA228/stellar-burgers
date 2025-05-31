import { FC, memo } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
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
export default memo(AppHeader);
