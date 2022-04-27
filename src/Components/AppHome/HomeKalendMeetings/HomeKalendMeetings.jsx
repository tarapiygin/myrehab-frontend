import 'kalend/dist/styles/index.css';
import Kalend, { CalendarView } from 'kalend';
import styles from './HomeKalendMeetings.module.css';

export default function HomeKalendMeetings({
  meetings, onNewEventClick, onEventClick, createMeetingButton,
}) {
  const onKalendEventClick = (e) => {
    if (onEventClick) onEventClick(e.id);
  };
  const renderKalend = () => {
    const newEvents = meetings.map((m) => {
      let color = '';
      if (m.status === 'rejected_student' || m.status === 'rejected_patient') {
        color = '#999999';
      }
      if (m.status === 'approval') {
        color = '#4caf50';
      }
      if (m.status === 'pending') {
        color = '#7047c3';
      }
      if (m.status === 'took_place') {
        color = '#009688';
      }
      const startAt = m.date_of_appointment || m.date_of_creation;
      const endAt = m.date_of_appointment || m.date_of_creation;
      const event = {
        id: m.id,
        startAt,
        endAt,
        // timezoneStartAt: string; // optional
        summary: m.patient.user.full_name,
        color,
      };
      return event;
    });
    return newEvents;
  };

  return (
    <div>
  <h5 className={styles.StatusesTitle}>Статусы записей:</h5>
  <ul className={styles.Statuses}>
    <li className={`${styles.StatusItem} statusColor--approval`}>Подтвержден</li>
    <li className={`${styles.StatusItem} statusColor--pending`}>На рассмотрении</li>
    <li className={`${styles.StatusItem} statusColor--took_place`}>Состоялся</li>
    <li className={`${styles.StatusItem} statusColor--rejected`}>Отклонен</li>
  </ul>

  <div className={styles.CalendarWrapper}>
  {createMeetingButton}
  <Kalend
    onEventClick={onKalendEventClick}
    events={renderKalend()}
    hourHeight={40}
    initialView={CalendarView.AGENDA}
    disabledViews={[CalendarView.DAY, CalendarView.THREE_DAYS]}
    timeFormat={'24'}
    weekDayStart={'Monday'}
    language={'ru'}
    isNewEventOpen={true}
  />
</div>
</div>);
}
