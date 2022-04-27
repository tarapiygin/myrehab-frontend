import { useState } from 'react';

export default function TextAreaFormGroup({
  name,
  label,
  initValue = '',
  requred = true,
  type = 'text',
  extendedClasses = 'col-12 col-sm-8 col-md-4',
  readonly = false,
  onChangeHook = null,
}) {
  const [value, setValue] = useState(initValue);

  const onValueChange = (e) => {
    setValue(e.target.value);
    if (onChangeHook) onChangeHook(e.target.value, name);
  };
  return (
  <div className={`${extendedClasses} form-group`}>
    <label htmlFor={name}>{label}</label>
    {readonly && <textarea
    required={requred}
    type={type}
    className="form-control"
    placeholder={label}
    name={name}
    value={value}
    readOnly={readonly}/>}

    {!readonly && <textarea
      required={requred}
      type={type}
      className="form-control"
      placeholder={label}
      name={name}
      value={value}
      onChange={onValueChange}/>}
  </div>
  );
}
