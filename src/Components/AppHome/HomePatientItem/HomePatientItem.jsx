import { ORIGIN } from '../../../API';

import styles from './HomePatientItem.module.css';

export default function HomePatientItem({ patient, setFilterMeetings }) {
  const onClickFilterButton = () => setFilterMeetings(patient, 'patient');
  return (
    <li className={`${styles.item} col-12 col-sm-6 col-md-4 col-lg-3`}>
            { patient.user.avatar
      && <div className={`${styles.avatar} ${styles.field}`} style={({ backgroundImage: `url(${ORIGIN + patient.user.avatar})` })}/> }
      <p className={styles.field}>{patient.user.full_name}</p>
      <a className={styles.field} href={`mailto:${patient.user.email}`} >{patient.user.email}</a>
      <a className={styles.field} href={`tel:${patient.user.phone}`}>{patient.user.phone}</a>
      <button onClick={onClickFilterButton} className={`btn btn-link ${styles.meetings} ${styles.button} ${styles.field}`}>Связанные приемы</button>
    </li>
  );
}
