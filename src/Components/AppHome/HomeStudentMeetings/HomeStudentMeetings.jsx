import './HomeStudentMeetings.css';
import { DateTime as dt } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import MeetingModel from '../../../Models/MeetingModel';
import Modal from '../../Base/Modal/Modal';
import HomeKalendMeetings from '../HomeKalendMeetings/HomeKalendMeetings';
import HomeMeetingFormEdit from '../HomeMeetingFormEdit/HomeMeetingFormEdit';
import HomeMeetingFormAdd from '../HomeMeetingFormAdd/HomeMeetingFormAdd';
import { setEditableMeeting } from '../../../Store/actionCreators';

export default function HomeStudentMeetings({ setFilterMeetings, filter }) {
  const editableMeeting = useSelector((state) => state.editableMeeting);
  const studentMeetings = useSelector((state) => state.data.studentMeetings);
  const student = useSelector((state) => state.data.student);
  const dispath = useDispatch();
  const [createMeeting, setCreateMeetingForm] = useState(false);

  const onClickClearFilterButton = () => {
    setFilterMeetings();
  };

  const filterMeetings = (meetings) => {
    if (filter) return meetings.filter((m) => m.patient.id === filter.id);
    return meetings;
  };

  const onNewEventClick = (e) => {
    setCreateMeetingForm(true);
  };

  const onEventClick = (id) => dispath(setEditableMeeting(id));

  const onCloseMeetingFormEdit = (e) => {
    e.preventDefault();
    dispath(setEditableMeeting(null));
  };

  const onCloseMeetingFormAdd = (e) => {
    e.preventDefault();
    setCreateMeetingForm(false);
  };

  return (
    <div className='HomeStudentMeetings commonFormContainer'>
      <h2 className='HomeStudentMeetings__title'>
        {!filter && 'Записи моих пациентов'}
        {filter && `Пациент ${filter.user.full_name}`}
      </h2>
      <Modal
      title={editableMeeting ? `Запись №${editableMeeting.id} от ${dt.fromISO(editableMeeting.date_of_creation).toLocaleString()}` : ''}
      body={editableMeeting ? <HomeMeetingFormEdit meeting={editableMeeting} onClose={onCloseMeetingFormEdit}/> : ''}
      onClose={onCloseMeetingFormEdit}
      show={!!editableMeeting}
      />
      <Modal
      title={'Записать пациента'}
      body={createMeeting ? <HomeMeetingFormAdd student={student} onSave={''} onClose={onCloseMeetingFormAdd}/> : ''}
      onClose={onCloseMeetingFormAdd}
      show={createMeeting}
      />
      {filter && <button className='btn btn-outline-info btn-block mb-3' onClick={onClickClearFilterButton}>Очистить фильтр</button>}
      <HomeKalendMeetings
      meetings={filterMeetings(studentMeetings)}
      onNewEventClick={onNewEventClick}
      onEventClick={onEventClick}/>
    </div>
  );
}

HomeStudentMeetings.propTypes = {
  studentMeetings: PropTypes.arrayOf(PropTypes.exact(MeetingModel)),
  onFilterMeetings: PropTypes.func,
  dispatchState: PropTypes.func,
};
