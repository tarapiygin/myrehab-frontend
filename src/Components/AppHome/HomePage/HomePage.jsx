import './HomePage.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomePatientMeetings from '../HomePatientMeetings/HomePatientMeetings';
import HomeStudentForm from '../HomeStudentForm/HomeStudentForm';
import HomeStudentMeetings from '../HomeStudentMeetings/HomeStudentMeetings';
import HomeUserForm from '../HomeUserForm/HomeUserForm';
import HomePageMenu from '../HomePageMenu/HomePageMenu';
import HomeStudentPatients from '../HomeStudentPatients/HomeStudentPatients';
import { setActiveComponent } from '../../../Store/actionCreators';

export default function HomePage() {
  const activeComponent = useSelector((state) => state.activeComponent);
  const dispatch = useDispatch();
  const [filterMeetings, setFilterMeetings] = useState(null);

  const onSetFilterMeetings = (obj, type) => {
    if (obj && type === 'patient') {
      dispatch(setActiveComponent('STUDENT_MEETINGS'));
      setFilterMeetings(obj);
    } else if (obj && type === 'student') {
      dispatch(setActiveComponent('PATIENT_MEETINGS'));
      setFilterMeetings(obj);
    } else setFilterMeetings(null);
  };

  return (
    <div className='home'>
      <div className='HomePage'>
        <h1 className='HomePage__title'>Личный кабинет</h1>

        <HomePageMenu/>
        <div className='container'>
        {activeComponent === 'USER' && <HomeUserForm />}
        {activeComponent === 'STUDENT' && <HomeStudentForm />}
        {activeComponent === 'STUDENT_PATIENTS' && <HomeStudentPatients setFilterMeetings={onSetFilterMeetings}/>}
        {activeComponent === 'STUDENT_MEETINGS' && <HomeStudentMeetings setFilterMeetings={onSetFilterMeetings} filter = {filterMeetings}/>}
        {activeComponent === 'PATIENT_MEETINGS' && <HomePatientMeetings/>}
        </div>
      </div>
    </div>
  );
}
