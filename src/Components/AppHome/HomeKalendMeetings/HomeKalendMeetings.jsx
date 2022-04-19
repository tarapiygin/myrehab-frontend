import 'kalend/dist/styles/index.css';
import './HomeKalendMeetings.css';
import PropTypes from 'prop-types';
import Kalend, { CalendarView } from 'kalend';
import MeetingModel from '../../../Models/MeetingModel';
import HomeAddButton from '../HomeAddButton/HomeAddButton';

export default function HomeKalendMeetings({ meetings, onNewEventClick, onEventClick }) {
  const onKalendEventClick = (e) => onEventClick(e.id);
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
      const event = {
        id: m.id,
        startAt: m.date_of_appointment,
        endAt: m.date_of_appointment,
        // timezoneStartAt: string; // optional
        summary: m.patient.user.full_name,
        color,
      };
      return event;
    });
    return <Kalend
    onEventClick={onKalendEventClick}
    events={newEvents}
    hourHeight={40}
    initialView={CalendarView.AGENDA}
    disabledViews={[CalendarView.DAY, CalendarView.THREE_DAYS]}
    timeFormat={'24'}
    weekDayStart={'Monday'}
    language={'ru'}
    draggingDisabledConditions={{
      summary: 'Computers',
      allDay: true,
      color: 'pink',
    }}
    isNewEventOpen={true}
  />;
  };

  return (
    <div>
  <h5 className='HomeKalendMeetings__statusesTitle'>Статусы записей:</h5>
  <ul className='HomeKalendMeetings__statuses'>
    <li className='HomeKalendMeetings__statuses__item statusColor--approval'>Подтвержден</li>
    <li className='HomeKalendMeetings__statuses__item statusColor--pending'>На рассмотрении</li>
    <li className='HomeKalendMeetings__statuses__item statusColor--took_place'>Состоялся</li>
    <li className='HomeKalendMeetings__statuses__item statusColor--rejected'>Отклонен</li>
  </ul>

  <div className="Calendar__wrapper">
  <HomeAddButton text={'Создать запись'} onClick={onNewEventClick}/>
  {renderKalend()}
</div>
</div>);
}

HomeKalendMeetings.propTypes = {
  meetings: PropTypes.arrayOf(PropTypes.exact(MeetingModel)),
  onEventClick: PropTypes.func,
};
