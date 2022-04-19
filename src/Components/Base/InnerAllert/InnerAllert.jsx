import './InnerAllert.css';

export default function InnerAllert({
  title,
  body,
  onClose,
  onApprove,
}) {
  const onClickClose = (e) => {
    e.nativeEvent.preventDefault();
    onClose();
  };
  const onClickApprove = (e) => {
    e.nativeEvent.preventDefault();
    onApprove();
    onClose();
  };
  return (
  <div className='modal fade show' style={({ display: 'block' })}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="close" onClick={onClickClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {body}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClickClose}>Отмена</button>
          <button type="button" className="btn btn-primary" onClick={onClickApprove}>Подтвердить</button>
      </div>
      </div>
    </div>
  </div>
  );
}
