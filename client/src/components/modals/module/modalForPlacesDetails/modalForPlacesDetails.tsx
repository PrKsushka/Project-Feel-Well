import Modal from '../../modal';
import { useSelector } from 'react-redux';
import { PlaceElement, StoreState } from '../../../../store/types/types';
import React from 'react';
import styles from './modalForPlacesDetails.module.scss';

interface ModalForPlacesDetails {
  obj: React.MutableRefObject<PlaceElement>;
}
const ModalForPlacesDetails: React.FunctionComponent<ModalForPlacesDetails> = ({ obj: { current } }) => {
  const isActiveModal = useSelector((state: StoreState) => state.modal.placesDetails);
  return (
    <Modal isActive={isActiveModal}>
      <div className={styles.wrapper}>
        <div className={styles.image} style={{ backgroundImage: `url(${require(`../../../../${current.image}`)})` }}></div>
        <div className={styles.textWrapper}>
          <h3>{current.name}</h3>
          <p className={styles.title}>{current.title}</p>
          <p>{current.content}</p>
          <div className={styles.additionalInfo}>
            <p>
              Время работы &nbsp; <span className={styles.boldText}>{current.workingHours}</span>
            </p>
            <p>{current.address}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalForPlacesDetails;
