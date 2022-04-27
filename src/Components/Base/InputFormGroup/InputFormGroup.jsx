import { useState } from 'react';

import InputPromts from '../InputPromts/InputPromts';

export default function InputFormGroup({
  name,
  label,
  initValue = '',
  requred = true,
  type = 'text',
  extendedClasses = 'col-12 col-sm-8 col-md-4',
  readonly = false,
  onChangeHook = null,
  prompts = null,
}) {
  const [value, setValue] = useState(initValue);
  const [showPrompts, setShowPrompts] = useState(false);

  const onValueChange = (e) => {
    setValue(e.target.value);
    if (onChangeHook) onChangeHook(e.target.value);
  };

  const onClickPrompt = (newValue) => {
    setValue(newValue);
    setShowPrompts(false);
    if (onChangeHook) onChangeHook(newValue, name);
  };

  const onClickInput = () => {
    setShowPrompts(true);
  };

  const onBlur = () => setTimeout(() => setShowPrompts(false), 250);

  return (
  <div onBlur={onBlur} className={`${extendedClasses} form-group ${prompts ? 'position-relative' : ''}`}>
    <label htmlFor={name}>{label}</label>
    {readonly && <input
    onClick={onClickInput}
    required={requred}
    type={type}
    className="form-control"
    placeholder={label}
    name={name}
    value={value}
    readOnly={readonly}/>}

    {!readonly && <input
      onClick={onClickInput}
      required={requred}
      type={type}
      className="form-control"
      placeholder={label}
      name={name}
      value={value}
      onChange={onValueChange}/>}
    {prompts && <InputPromts
      show ={showPrompts}
      prompts={prompts}
      filterValue={value}
      onClickPrompt={onClickPrompt}/>}
  </div>
  );
}
