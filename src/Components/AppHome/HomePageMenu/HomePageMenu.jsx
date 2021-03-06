import './HomePageMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveComponent } from '../../../Store/actionCreators';

export default function HomePageMenu() {
  const student = useSelector((state) => state.data.student);
  const patient = useSelector((state) => state.data.patient);
  const activeComponent = useSelector((state) => state.activeComponent);
  const dispatch = useDispatch();

  const onClickButton = (e) => dispatch(setActiveComponent(e.target.dataset.type));

  return (
    <div className="HomePageMenu">
      <button onClick={onClickButton}
      data-type='USER'
      className={`btn HomePageMenu__toggle ${activeComponent === 'USER' ? 'HomePageMenu__toggle--active' : ''}` }
      type="button">Мои данные</button>
      {student && <button onClick={onClickButton}
      data-type='STUDENT'
      className={`btn HomePageMenu__toggle ${activeComponent === 'STUDENT' ? 'HomePageMenu__toggle--active' : ''}`}
      type="button">Профиль специалиста</button>}
      {student && <button onClick={onClickButton}
      data-type='STUDENT_PATIENTS'
      className={`btn HomePageMenu__toggle ${activeComponent === 'STUDENT_PATIENTS' ? 'HomePageMenu__toggle--active' : ''}`}
      type="button">Мои пациенты</button>}
      {student && <button onClick={onClickButton}
      data-type='STUDENT_MEETINGS'
      className={`btn HomePageMenu__toggle ${activeComponent === 'STUDENT_MEETINGS' ? 'HomePageMenu__toggle--active' : ''}`}
      type="button">Расписание приемов</button>}
      {patient && <button onClick={onClickButton}
      data-type='PATIENT_MEETINGS'
      className={`btn HomePageMenu__toggle ${activeComponent === 'PATIENT_MEETINGS' ? 'HomePageMenu__toggle--active' : ''}`}
      type="button">Записи к специалисту</button>}
    </div>
  );
}
