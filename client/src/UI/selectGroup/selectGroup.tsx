import React, { ReactNode } from 'react';
import styles from './selectGroup.module.scss';

interface CheckboxGroupTypes {
  onChangeFunc: (e: any) => void;
  arr: Array<Array<string>> | Array<string>;
  children?: ReactNode;
}

type Check = {
  obj: CheckboxGroupTypes;
};

const SelectGroup: React.FunctionComponent<Check> = ({ obj: { onChangeFunc, arr } }) => {
  return (
    <select onChange={onChangeFunc} className={styles.selectElem}>
      <option selected disabled hidden>
        Сортировать
      </option>
      {arr.length === 2
        ? arr.map((elem, i) => (
            <option key={i} value={elem[0]}>
              {elem[1]}
            </option>
          ))
        : arr.map((elem, i) => (
            <option key={i} value={elem}>
              {elem}
            </option>
          ))}
    </select>
  );
};
export default SelectGroup;
