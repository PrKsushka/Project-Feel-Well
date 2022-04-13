import React, { ReactNode } from 'react';

interface CheckboxGroupTypes {
  onChangeFunc: (e: any) => void;
  arr: Array<Array<string>>;
  children?: ReactNode;
}

type Check = {
  obj: CheckboxGroupTypes;
};

const SelectGroup: React.FunctionComponent<Check> = ({ obj: { onChangeFunc, arr } }) => {
  return (
    <select onChange={onChangeFunc}>
      <option selected disabled hidden>
        Сортировать
      </option>
      {arr.map((elem, i) => (
        <option key={i} value={elem[0]}>
          {elem[1]}
        </option>
      ))}
    </select>
  );
};
export default SelectGroup;
