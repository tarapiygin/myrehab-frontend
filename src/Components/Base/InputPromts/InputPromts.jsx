import './InputPromts.css';
import React from 'react';
import { uid } from 'uid';

export default function InputPromts({
  show, prompts, onClickPrompt,
}) {
  const onClick = (e) => {
    onClickPrompt(e.target.innerText);
  };

  return (
    <div key={uid(8)} className={`InputPromts${prompts.length !== 0 && show ? '' : ' d-none'}`}>
      {prompts.slice(0, 4).map((p) => <div onClick={onClick} key={uid(6)} className='InputPromts__value'>{p}</div>)}
    </div>
  );
}
