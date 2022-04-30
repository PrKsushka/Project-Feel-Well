import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types';
import styles from './places.module.scss';
import { dataAboutPlaces } from '../../store/modules/places/places.actions';

const Places: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const places = useSelector((state: StoreState) => state.places.places);
  useEffect(() => {
    dispatch(dataAboutPlaces());
  }, []);

  console.log(places);
  return (
    <div className={styles.placesWrapper}>
      <div className={styles.placesBanner}></div>
    </div>
  );
};
export default Places;
