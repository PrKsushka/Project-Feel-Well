import React from 'react';
import { useDispatch } from 'react-redux';
import arr from '../../constants/sortRecipes';
import { sortedRecipesByHealth } from '../../store/modules/recipes/recipes.actions';
import { ObjTypes } from '../types';
import style from './inputGroup.module.scss';

const InputGroup: React.FunctionComponent<ObjTypes> = ({ obj }) => {
  const dispatch = useDispatch();
  const isChecked = (value: any) => {
    if (value === obj.input) {
      return true;
    }
    return false;
  };
  const handleChange = (k: string) => (e: any) => {
    obj.inputFunc((prevState: string) => e.target.value);
    arr.typesArr.forEach((el) => {
      if (el === e.target.value) {
        dispatch(sortedRecipesByHealth(e.target.value));
      }
    });
  };

  return (
    <>
      {obj.arr.map((el, i) => (
        <label key={i} className={style.elem}>
          <input type="radio" value={el} checked={isChecked(el)} onChange={handleChange(el)} />
          {el}
        </label>
      ))}
    </>
  );
};
export default InputGroup;
