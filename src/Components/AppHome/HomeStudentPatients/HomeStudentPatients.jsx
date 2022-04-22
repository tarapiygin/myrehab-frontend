/* eslint-disable max-len */
import './HomeStudentPatients.css';
import { useSelector } from 'react-redux';
import HomePatientItem from '../HomePatientItem/HomePatientItem';

export default function HomeStudentPatients({ setFilterMeetings }) {
  const patients = useSelector((state) => state.data.student.patients);
  return (
    <div className='HomeStudentPatients commonFormContainer'>
      <h2>Мои пациенты</h2>
      <ul className='HomeStudentPatients__list row justify-content-around'>
      { patients.map((p) => <HomePatientItem key={p.id} setFilterMeetings={setFilterMeetings} patient={p}/>) }
      </ul>
    </div>
  );
}
