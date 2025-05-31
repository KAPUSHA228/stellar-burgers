import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '@slices';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '@components';
import { BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const { loading: isIngredientsLoading, error } = useSelector(
    (state) => state.ingredients
  );
  const items = useSelector((state) => state.ingredients.items);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (isIngredientsLoading) return <Preloader />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients items={items} />
        <BurgerConstructor />
      </div>
    </main>
  );
};
