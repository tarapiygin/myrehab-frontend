import { useState } from 'react';
import { DateTime as dt } from 'luxon';
import { useDispatch } from 'react-redux';
import InnerAllert from '../../Base/InnerAllert/InnerAllert';
import { updateMeeting } from '../../../Store/actionCreators';
import STATUSES from '../../../constants';

export default function HomePatientMeetingFormEdit({
  meeting, onClose,
}) {
  const innerAllertDefault = {
    show: false,
    title: '',
    body: '',
    onClose: null,
    onApprove: null,
  };

  const dispatch = useDispatch();
  const [meetingData, setState] = useState({ ...meeting });
  const [innerAllertData, setInnerAlertData] = useState(innerAllertDefault);

  const onClickRejectStatus = (e) => {
    e.preventDefault();
    setInnerAlertData({
      show: true,
      title: 'Вы хотите отменить прием?',
      body: 'При отмене записи специалист получит уведомление. Отменить это действие - невозможно!',
      onApprove: () => setState((prev) => {
        dispatch(updateMeeting(JSON.stringify({
          ...prev,
          student: meetingData.student.id,
          patient: meetingData.patient.id,
          status: 'rejected_patient',
        }), 'patient', 'Запись отменена'));
        return { ...prev, status: 'rejected_patient' };
      }),
    });
  };
  const checkStatuses = () => meetingData.status !== 'rejected_student' && meetingData.status !== 'rejected_patient' && meetingData.status !== 'took_place';

  return (
    <div className='HomeMeetingFormEdit'>
          {innerAllertData.show && <InnerAllert
    title={innerAllertData.title}
    body={innerAllertData.body}
    onClose={() => setInnerAlertData(innerAllertDefault)} onApprove={innerAllertData.onApprove}/>}
    <p>Специалист: {meetingData.student.user.full_name}</p>
    <p>Специализация: {meetingData.student.specialty.title}</p>
    <p>Телефон: <a href={`tel:${meetingData.student.user.phone}`}>{meetingData.student.user.phone}</a></p>
    <p>Email: <a href={`mailto:${meetingData.student.user.email}`}>{meetingData.student.user.email}</a></p>
    <p>Жалоба: {meetingData.disease === '' ? 'Не указана' : meetingData.disease}</p>
    <p>Текущий статус: <span className={`HomeMeetingFormEdit__Status statusColor--${meetingData.status}`}>{STATUSES[meetingData.status]}</span></p>
    <p>Дата: {meetingData.date_of_appointment
      ? dt.fromISO(meetingData.date_of_appointment).toFormat('dd.MM.yyyy в HH:mm') : 'Не назначена'}</p>
    <p>Адресс приема: {meetingData.address
      ? meetingData.address : meetingData.student.work_place}</p>

    {checkStatuses() && <div className='HomeMeetingFormEdit__StatusButtons'>
      <p className='HomeMeetingFormEdit__StatusButtons__Title'>Управление статусом:</p>
      <button
      className='btn StatusButtons__Button statusColor--rejected'
      onClick={onClickRejectStatus}>Отменить прием</button>
    </div>
    }
    <div className='row justify-content-around'>
      <button onClick={onClose} className='btn btn-outline-dark col-5 HomeMeetingFormEdit__button'>Закрыть</button>
    </div>
</div>
  );
}
