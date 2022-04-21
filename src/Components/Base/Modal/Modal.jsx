import './Modal.css';
import { useEffect, useRef } from 'react';

export default function Modal({
  show,
  title,
  body,
  onClose,
}) {
  const container = useRef();
  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
      container.current.classList.add('show');
      container.current.style.display = 'block';
    } else {
      container.current.classList.remove('show');
      container.current.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
  return (
  <div className='modal fade' tabIndex="-1" role="dialog" ref={container} >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {body}
        </div>
      </div>
    </div>
  </div>
  );
}
