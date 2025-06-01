import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { ProtectedRouter } from '@protect';
import { useDispatch } from '@app-store';
import { getUser, IngredientsThunk, setUserCheck } from '@slices';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  useEffect(() => {
    dispatch(IngredientsThunk());
    dispatch(getUser())
      .unwrap()
      .catch(() => {})
      .finally(() => dispatch(setUserCheck()));
  }, []);
  const handleOnClose = (): void => {
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            <ProtectedRouter isPublic>
              <Login />
            </ProtectedRouter>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRouter>
              <Profile />
            </ProtectedRouter>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRouter isPublic>
              <Register />
            </ProtectedRouter>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRouter>
              <ForgotPassword />
            </ProtectedRouter>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRouter>
              <ResetPassword />
            </ProtectedRouter>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRouter>
              <ProfileOrders />
            </ProtectedRouter>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRouter>
                <Modal title={'Заказ'} onClose={handleOnClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRouter>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Ингридиент'} onClose={handleOnClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Заказ'} onClose={handleOnClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
