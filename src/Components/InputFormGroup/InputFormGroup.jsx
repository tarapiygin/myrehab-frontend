import { useState } from 'react';

export default function InputFormGroup({
  name,
  label,
  initValue = '',
  requred = true,
  type = 'text',
  extendedClasses = 'col-12 col-sm-6 col-md-4',
}) {
  const [value, setValue] = useState(initValue);
  return (
  <div className={`${extendedClasses} form-group`}>
    <label htmlFor={name}>{label}</label>
    <input required={requred} type={type} className="form-control" placeholder={label} name={name} defaultValue={value}/>
  </div>
  );
}
