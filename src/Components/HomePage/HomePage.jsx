import './HomePage.css';
import { useState } from 'react';
import HomePatientMeetings from '../HomePatientMeetings/HomePatientMeetings';
import HomeStudentContainer from '../HomeStudentContainer/HomeStudentContainer';
import HomeStudentMeetings from '../HomeStudentMeetings/HomeStudentMeetings';
import HomeUserContainer from '../HomeUserContainer/HomeUserContainer';
import HomePageMenu from '../HomePageMenu/HomePageMenu';

export default function HomePage({
  user, student, patient, studentMeetings, patientMeetings, dispatchState,
}) {
  const [activeComponent, setActiveComponent] = useState('user');
  const onToggleComponent = (type) => {
    setActiveComponent(type);
  };

  return (
    <div className='home'>
      <div className='HomePage container'>
        <h1 className='HomePage__title'>Личный кабинет</h1>
        <HomePageMenu
        student={student}
        patient={patient}
        onToggleComponent={onToggleComponent}/>
        { activeComponent === 'user' && <HomeUserContainer user={user} dispatchState={dispatchState}/>}
        { activeComponent === 'student' && <HomeStudentContainer student={student}/>}
        { activeComponent === 'studentMeetings' && studentMeetings.length > 0 && <HomeStudentMeetings student={studentMeetings}/>}
        { activeComponent === 'patientMeetings' && patientMeetings.length > 0 && <HomePatientMeetings patient={patientMeetings}/>}
      </div>
    </div>
  );
}
