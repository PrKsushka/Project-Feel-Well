import React from 'react';
import { useDispatch } from 'react-redux';
import arr from '../../constants/sortRecipes';
import { ObjTypes } from '../types';
import style from './checkboxGroup.module.scss';

const CheckboxGroup: React.FunctionComponent<ObjTypes> = ({ obj }) => {
  const dispatch = useDispatch();
  const handleChange = (e: any) => {
    const { checked } = e.target;
    if (checked) {
      obj.inputFunc((prevState: Array<string>) => {
        return [...prevState, e.target.value];
      });
    } else {
      obj.inputFunc((prevState: Array<string>) => {
        return prevState.filter((el) => {
          return el != e.target.value;
        });
      });
    }
    // arr.typesArr.forEach((el) => {
    //   if (el === e.target.value) {
    //     dispatch(sortedRecipesByHealth(e.target.value));
    //   }
    // });
  };

  return (
    <>
      {obj.arr.map((el, i) => (
        <label key={i} className={style.elem}>
          <input type="checkbox" value={el} onChange={handleChange} name={el} />
          {el}
        </label>
      ))}
    </>
  );
};
export default CheckboxGroup;
