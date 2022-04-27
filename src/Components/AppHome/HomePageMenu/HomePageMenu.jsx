import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setActiveComponent } from '../../../Store/actionCreators';

import styles from './HomePageMenu.module.css';

export default function HomePageMenu() {
  const student = useSelector((state) => state.data.student);
  const patient = useSelector((state) => state.data.patient);
  const activeComponent = useSelector((state) => state.activeComponent);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeComponent === null) {
      if (student) dispatch(setActiveComponent('STUDENT_MEETINGS'));
      else dispatch(setActiveComponent('PATIENT_MEETINGS'));
    }
  });
  const onClickButton = (e) => dispatch(setActiveComponent(e.target.dataset.type));

  return (
    <div className={styles.menu}>
      {student && <button onClick={onClickButton}
      data-type='STUDENT_MEETINGS'
      className={`btn ${styles.toggle} ${activeComponent === 'STUDENT_MEETINGS' ? styles.toggleActive : ''}`}
      type="button">Расписание приемов</button>}
      {patient && <button onClick={onClickButton}
      data-type='PATIENT_MEETINGS'
      className={`btn ${styles.toggle} ${activeComponent === 'PATIENT_MEETINGS' ? styles.toggleActive : ''}`}
      type="button">Записи к специалистам</button>}
      <button onClick={onClickButton}
      data-type='USER'
      className={`btn ${styles.toggle} ${activeComponent === 'USER' ? styles.toggleActive : ''}` }
      type="button">Мои данные</button>
      {student && <button onClick={onClickButton}
      data-type='STUDENT'
      className={`btn ${styles.toggle} ${activeComponent === 'STUDENT' ? styles.toggleActive : ''}`}
      type="button">Рабочий профиль</button>}
      {student && <button onClick={onClickButton}
      data-type='STUDENT_PATIENTS'
      className={`btn ${styles.toggle} ${activeComponent === 'STUDENT_PATIENTS' ? styles.toggleActive : ''}`}
      type="button">Пациенты</button>}
    </div>
  );
}
