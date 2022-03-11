import React, { ReactNode, useState } from 'react';

type Obj = { arr: Array<string> };
type ObjTypes = {
  obj: Obj;
};
const InputGroup: React.FunctionComponent<ObjTypes> = ({ obj }) => {
  const [input, setInput] = useState('');
  const isChecked = (value: any) => {
    if (value === input) {
      return true;
    }
    return false;
  };
  const handleChange = (e: any) => {
    setInput((prevState) => e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      {obj.arr.map((el, i) => (
        <input key={i} type="radio" value={el} checked={isChecked(el)} onChange={handleChange} />
      ))}
    </>
  );
};
export default InputGroup;
