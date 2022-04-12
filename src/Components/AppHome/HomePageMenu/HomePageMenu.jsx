import { useRef } from 'react';
import './HomePageMenu.css';

export default function HomePageMenu({ student, patient, onToggleComponent }) {
  const onClickButton = (e) => {
    onToggleComponent(e.target.dataset.type);
    const buttons = refContainer.current.querySelectorAll('.HomePageMenu__toggle');
    for (const b of buttons) {
      b.classList.remove('HomePageMenu__toggle--active');
      if (b.dataset.type === e.target.dataset.type) b.classList.add('HomePageMenu__toggle--active');
    }
  };

  const refContainer = useRef();

  return (
    <div className="HomePageMenu" ref={refContainer}>
      <button onClick={onClickButton} data-type='user' className="btn HomePageMenu__toggle HomePageMenu__toggle--active" type="button">Мои данные</button>
      {student && <button onClick={onClickButton} data-type='student' className="btn HomePageMenu__toggle" type="button">Профиль специалиста</button>}
      {student && <button onClick={onClickButton} data-type='studentPatients' className="btn HomePageMenu__toggle" type="button">Мои пациенты</button>}
      {student && <button onClick={onClickButton} data-type='studentMeetings' className="btn HomePageMenu__toggle" type="button">Расписание приемов</button>}
      {patient && <button onClick={onClickButton} data-type='patientMeetings' className="btn HomePageMenu__toggle" type="button">Записи к специалисту</button>}
    </div>
  );
}
