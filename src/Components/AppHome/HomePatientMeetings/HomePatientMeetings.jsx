import { DateTime as dt } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../Base/Modal/Modal';
import HomeKalendMeetings from '../HomeKalendMeetings/HomeKalendMeetings';
import HomePatientMeetingFormEdit from '../HomePatientMeetingFormEdit/HomePatientMeetingFormEdit';
import { setEditablePatientMeeting } from '../../../Store/actionCreators';

export default function HomePatientMeetings() {
  const editableMeeting = useSelector((state) => state.editablePatientMeeting);
  const meetings = useSelector((state) => state.data.patientMeetings);
  const dispath = useDispatch();

  const onEventClick = (id) => dispath(setEditablePatientMeeting(id));

  const onCloseMeetingFormEdit = (e) => {
    e.preventDefault();
    dispath(setEditablePatientMeeting(null));
  };

  return (
    <div className='HomeStudentMeetings commonFormContainer'>
      <h2 className='HomeStudentMeetings__title'>Мои записи</h2>
      <Modal
      title={editableMeeting ? `Запись №${editableMeeting.id} от ${dt.fromISO(editableMeeting.date_of_creation).toLocaleString()}` : ''}
      body={editableMeeting ? <HomePatientMeetingFormEdit meeting={editableMeeting} onEventClick={onEventClick} onClose={onCloseMeetingFormEdit}/> : ''}
      onClose={onCloseMeetingFormEdit}
      show={!!editableMeeting}
      />
      <HomeKalendMeetings
      meetings={meetings}
      onNewEventClick={null}
      onEventClick={onEventClick}/>
    </div>
  );
}
