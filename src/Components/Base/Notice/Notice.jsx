import './Notice.css';
import React, { useContext } from 'react';
import NoticeContext from '../../../context';

export default function Notice() {
  const context = useContext(NoticeContext);
  const renderNoticeStyles = () => {
    if (context.show) return 'Notice Notice--visible';
    return 'Notice';
  };

  const renderStatusStyles = () => {
    if (context.status) return 'Notice__content Notice__content--info';
    return 'Notice__content Notice__content--fail';
  };
  const onClickClose = () => {
    context.toggleNotice({ show: false });
  };
  return (
    <div className={renderNoticeStyles()}>
      <div className={renderStatusStyles()}>
        <button onClick={onClickClose}className="Notice__close" type="button">✖</button>
        <div className="Notice__body">{context.message}</div>
      </div>
    </div>
  );
}
