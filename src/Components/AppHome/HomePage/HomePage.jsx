import './HomePage.css';
import { useState } from 'react';
import HomePatientMeetings from '../HomePatientMeetings/HomePatientMeetings';
import HomeStudentForm from '../HomeStudentForm/HomeStudentForm';
import HomeStudentMeetings from '../HomeStudentMeetings/HomeStudentMeetings';
import HomeUserForm from '../HomeUserForm/HomeUserForm';
import HomePageMenu from '../HomePageMenu/HomePageMenu';

export default function HomePage({
  user,
  student,
  patient,
  studentMeetings,
  patientMeetings,
  dispatchState,
}) {
  const components = {
    user: <HomeUserForm user={user} dispatchState={dispatchState}/>,
    student: <HomeStudentForm student={student}/>,
    studentMeetings: <HomeStudentMeetings studentMeetings={studentMeetings}/>,
    patientMeetings: <HomePatientMeetings patientMeetings={patientMeetings}/>,
  };

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
        {components[activeComponent]}
      </div>
    </div>
  );
}
