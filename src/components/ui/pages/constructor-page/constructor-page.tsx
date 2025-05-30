import { FC } from 'react';
import { useSelector } from '../../../../services/store';
import { BurgerIngredients } from '../../../../components';
import { BurgerConstructor } from '../../../../components';
import styles from './constructor-page.module.css';

export const ConstructorPageUI: FC = () => {
  const items = useSelector((state) => state.ingredients.items);

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
