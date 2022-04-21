import './HomePatientItem.css';
import PropTypes from 'prop-types';
import PatientModel from '../../../Models/PatientModel';

export default function HomePatientItem({ patient, setFilterMeetings }) {
  const onClickFilterButton = () => setFilterMeetings(patient, 'patient');
  return (
    <li className="HomePatientItem">
      <p className="HomePatientItem__name HomePatientItem__field">{patient.user.full_name}</p>
      <a className="HomePatientItem__email HomePatientItem__field" href={`mailto:${patient.user.email}`} >{patient.user.email}</a>
      <a className="HomePatientItem__phone HomePatientItem__field" href={`tel:${patient.user.phone}`}>{patient.user.phone}</a>
      { patient.user.avatar && <img className="HomePatientItem__avatar HomePatientItem__field" alt={patient.user.full_name} src={patient.user.avatar}>Записи к специалисту</img> }
      <button onClick={onClickFilterButton} className="btn btn-link HomePatientItem__meetings HomePatientItem__field HomePatientItem__button">Связанные приемы</button>
    </li>
  );
}

HomePatientItem.propTypes = {
  patient: PropTypes.exact(PatientModel),
  onFilterMeetings: PropTypes.func,
};
