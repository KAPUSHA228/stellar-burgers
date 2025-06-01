import { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div className={styles.modal} data-cy='my_modal'>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
          <button
            className={styles.button}
            type='button'
            onClick={onClose}
            data-cy='my_modal_close_button'
          >
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={styles.content} data-cy={'my_burger-ingredient-title'}>
          {children}
        </div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
