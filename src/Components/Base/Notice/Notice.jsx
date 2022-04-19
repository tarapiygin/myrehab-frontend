import './Notice.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotice } from '../../../Store/actionCreators';

export default function Notice() {
  const context = useSelector((state) => state.notice);
  const [timeoutId, setTimeoutId] = useState(null);
  const dispatch = useDispatch();
  const renderNoticeStyles = () => {
    if (context.show) return 'Notice Notice--visible';
    return 'Notice';
  };

  const renderStatusStyles = () => {
    if (context.status) return 'Notice__content Notice__content--info';
    return 'Notice__content Notice__content--fail';
  };

  useEffect(() => {
    if (context.show) {
      const id = setTimeout(() => {
        dispatch(hideNotice());
      }, context.time);
      setTimeoutId(id);
    }
  }, [context.show, context.time, dispatch]);

  const onClickClose = (e) => {
    e.preventDefault();
    clearTimeout(timeoutId);
    setTimeoutId(null);
    dispatch(hideNotice());
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
