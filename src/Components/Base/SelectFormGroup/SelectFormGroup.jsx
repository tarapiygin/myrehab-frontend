import { useState } from 'react';
import { uid } from 'uid';

export default function SelectFormGroup({
  name,
  label,
  initValue = '',
  options = [],
  extendedClasses = 'col-12 col-sm-8 col-md-4',
  onChangeHook = null,
}) {
  const [value, setValue] = useState(initValue);

  const onValueChange = (e) => {
    setValue(e.target.value);
    if (onChangeHook) onChangeHook(e.target.value);
  };

  const rederOptions = () => {
    const elements = options.map((o) => {
      if (o[0] === value) return <option key={uid(4)} value={o[0]}>{o[1]}</option>;
      return <option key={uid(4)} value={o[0]}>{o[1]}</option>;
    });
    return elements;
  };

  return (
  <div className={`${extendedClasses} form-group`}>
    <label htmlFor={name}>{label}</label>
    <select onChange={onValueChange} className='form-control' name={name} value={value} >
      {rederOptions()}
    </select>
  </div>
  );
}
