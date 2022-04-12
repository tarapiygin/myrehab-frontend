import PropTypes from 'prop-types';
import Kalend, { CalendarView } from 'kalend';
import 'kalend/dist/styles/index.css';
import { useEffect, useState } from 'react';
import './HomeStudentMeetings.css';
import MeetingModel from '../../../Models/MeetingModel';

export default function HomeStudentMeetings({ studentMeetings }) {
  const [events, setEvents] = useState([]);

  const createEvents = (meetings) => {
    const newEvents = meetings.map((m) => {
      const patientName = `${m.patient.user.first_name}`;
      let color = 'green';
      if (m.status === 'rejected') {
        color = '#c17474';
      }
      const event = {
        id: m.id,
        startAt: m.date_of_appointment,
        endAt: m.date_of_appointment,
        // timezoneStartAt: string; // optional
        summary: patientName,
        color,
      };
      return event;
    });
    setEvents(newEvents);
  };
  // Create and load demo events
  useEffect(() => {
    createEvents(studentMeetings);
  });

  const onNewEventClick = () => {
    const msg = `New event click action\n\n Callback data:\n\n${JSON.stringify({
      hour: 1,
      day: 21,
      startAt: 22,
      endAt: 22,
      view: 22,
      event: 'click event ',
    })}`;
    console.log(msg);
  };

  // Callback for event click
  const onEventClick = () => {
    const msg = `Click on event action\n\n Callback data:\n\n${JSON.stringify(
      22,
    )}`;
    console.log(msg);
  };

  // Callback after dragging is finished
  const onEventDragFinish = () => { console.log('hi'); };

  return (
    <div className="HomeStudentMeetings commonFormContainer">
      <h2 className="HomeStudentMeetings__title">Записи моих пациентов</h2>
      <div className="Calendar__wrapper">
        <Kalend
        // onEventClick={(e) => console.log(e)}
        onNewEventClick={(e) => console.log(e)}
        events={events}
        hourHeight={40}
        initialView={CalendarView.MONTH}
        disabledViews={[CalendarView.DAY, CalendarView.THREE_DAYS, CalendarView.AGENDA]}
        // onSelectView={(e) => console.log(e)}
        // selectedView={(e) => console.log(e)}
        // onPageChange={(e) => console.log(e)}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'ru'}
        showTimeLine={true}
        draggingDisabledConditions={{
          summary: 'Computers',
          allDay: false,
          color: 'pink',
        }}
        // onEventDragFinish={onEventDragFinish}
      />
    </div>
    </div>
  );
}

HomeStudentMeetings.propTypes = {
  studentMeetings: PropTypes.arrayOf(PropTypes.exact(MeetingModel)),
};
