import { FC } from 'react';
import styles from './not-found-404.module.css';

export const NotFound404: FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>404</h1>
    <p className={styles.text}>Страница не найдена</p>
  </div>
);
