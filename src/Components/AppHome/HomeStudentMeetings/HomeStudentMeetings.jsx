import './HomeStudentMeetings.css';
import { DateTime as dt } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import HomeAddButton from '../HomeAddButton/HomeAddButton';
import Modal from '../../Base/Modal/Modal';
import HomeKalendMeetings from '../HomeKalendMeetings/HomeKalendMeetings';
import HomeStudentMeetingFormEdit from '../HomeStudentMeetingFormEdit/HomeStudentMeetingFormEdit';
import HomeMeetingFormAdd from '../HomeMeetingFormAdd/HomeMeetingFormAdd';
import { setEditableStudentMeeting } from '../../../Store/actionCreators';

export default function HomeStudentMeetings({ setFilterMeetings, filter }) {
  const editableMeeting = useSelector((state) => state.editableStudentMeeting);
  const studentMeetings = useSelector((state) => state.data.student.meetings);
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

  const onEventClick = (id) => dispath(setEditableStudentMeeting(id));

  const onCloseMeetingFormEdit = (e) => {
    e.preventDefault();
    dispath(setEditableStudentMeeting(null));
  };

  const onCloseMeetingFormAdd = (e) => {
    e.preventDefault();
    setCreateMeetingForm(false);
  };
  const createMeetingButton = <HomeAddButton text={'Создать запись'} onClick={onNewEventClick}/>;
  return (
    <div className='HomeStudentMeetings commonFormContainer'>
      <h2 className='HomeStudentMeetings__title'>
        {!filter && 'Записи моих пациентов'}
        {filter && `Пациент ${filter.user.full_name}`}
      </h2>
      <Modal
      title={editableMeeting ? `Запись №${editableMeeting.id} от ${dt.fromISO(editableMeeting.date_of_creation).toLocaleString()}` : ''}
      body={editableMeeting ? <HomeStudentMeetingFormEdit meeting={editableMeeting} onClose={onCloseMeetingFormEdit}/> : ''}
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
      onEventClick={onEventClick}
      createMeetingButton={createMeetingButton}/>
    </div>
  );
}

HomeStudentMeetings.propTypes = {
  setFilterMeetings: PropTypes.func,
  filter: PropTypes.object,
};
