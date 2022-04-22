import './HomePatientItem.css';
import { ORIGIN } from '../../../API';

export default function HomePatientItem({ patient, setFilterMeetings }) {
  const onClickFilterButton = () => setFilterMeetings(patient, 'patient');
  return (
    <li className="HomePatientItem col-12 col-sm-6 col-md-4 col-lg-3">
            { patient.user.avatar
      && <div className="HomePatientItem__avatar HomePatientItem__field" style={({ backgroundImage: `url(${ORIGIN + patient.user.avatar})` })}/> }
      <p className="HomePatientItem__name HomePatientItem__field">{patient.user.full_name}</p>
      <a className="HomePatientItem__email HomePatientItem__field" href={`mailto:${patient.user.email}`} >{patient.user.email}</a>
      <a className="HomePatientItem__phone HomePatientItem__field" href={`tel:${patient.user.phone}`}>{patient.user.phone}</a>
      <button onClick={onClickFilterButton} className="btn btn-link HomePatientItem__meetings HomePatientItem__field HomePatientItem__button">Связанные приемы</button>
    </li>
  );
}
