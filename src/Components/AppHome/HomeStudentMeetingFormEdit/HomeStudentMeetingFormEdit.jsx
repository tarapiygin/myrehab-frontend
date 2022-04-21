import './HomeStudentMeetingFormEdit.css';
import { useRef, useState } from 'react';
import { Russian } from 'flatpickr/dist/l10n/ru';
import Flatpickr from 'react-flatpickr';
import { DateTime as dt } from 'luxon';

import { useDispatch } from 'react-redux';
import InnerAllert from '../../Base/InnerAllert/InnerAllert';
import TextAreaFormGroup from '../../Base/TextAreaFormGroup/TextAreaFormGroup';
import { updateMeeting } from '../../../Store/actionCreators';
import STATUSES from '../../../constants';

export default function HomeStudentMeetingFormEdit({
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
  const [datePicker, setDatePicker] = useState(meeting.date_of_appointment);
  const [innerAllertData, setInnerAlertData] = useState(innerAllertDefault);
  const meetingForm = useRef();

  const onChangeDateOfAppointment = (dates) => {
    setDatePicker(dates[0]);
    setState((prev) => ({ ...prev, date_of_appointment: new Date(dates[0]).toJSON }));
  };

  const onChangeAddress = (value) => {
    setState((prev) => ({ ...prev, address: value }));
  };

  const onSubmitForm = async (e) => {
    if (e) e.preventDefault();
    dispatch(updateMeeting(JSON.stringify({
      ...meetingData,
      student: meetingData.student.id,
      patient: meetingData.patient.id,
    }), 'student', 'Запись обновлена!'));
  };

  const onClickRejectStatus = (e) => {
    e.preventDefault();
    setInnerAlertData({
      show: true,
      title: 'Вы хотите отменить прием?',
      body: 'При отмене записи Ваш пациент получит уведомление. Отменить это действие - невозможно!',
      onApprove: () => setState((prev) => {
        dispatch(updateMeeting(JSON.stringify({
          ...prev,
          student: meetingData.student.id,
          patient: meetingData.patient.id,
          status: 'rejected_student',
        }), 'student', 'Запись отменена'));
        return { ...prev, status: 'rejected_student' };
      }),
    });
  };

  const onClickTookPlaceStatus = (e) => {
    e.preventDefault();
    setInnerAlertData({
      show: true,
      title: 'Прием уже состоялся?',
      body: 'После подтверждения запись будет перенесена в раздел состоявшихся и станет недоступна для редактирования',
      onApprove: () => setState((prev) => {
        dispatch(updateMeeting(JSON.stringify({
          ...prev,
          student: meetingData.student.id,
          patient: meetingData.patient.id,
          status: 'took_place',
        }), 'student', 'Запись помечена состояшейся'));
        return { ...prev, status: 'took_place' };
      }),
    });
  };

  const onClickApprovStatus = (e) => {
    e.preventDefault();
    setInnerAlertData({
      show: true,
      title: 'Подтверждаете запись?',
      body: 'После сохранения записи Ваш пациент получит уведомление о времени и месте проведения приема',
      onApprove: () => setState((prev) => ({ ...prev, status: 'approval' })),
    });
  };

  const checkStatuses = () => meetingData.status !== 'rejected_student' && meetingData.status !== 'rejected_patient' && meetingData.status !== 'took_place';

  const renderStatusButtons = () => {
    const buttons = [];
    if (meetingData.status === 'approval' && meetingData.date_of_appointment && new Date(meetingData.date_of_appointment) < Date.now()) {
      buttons.push(<button
        key='took_place'
        className='btn StatusButtons__Button statusColor--took_place'
        onClick={onClickTookPlaceStatus}>Прием состоялся!</button>);
    }
    if (checkStatuses() && meetingData.status !== 'approval') {
      buttons.push(<button
      key='approval'
      className='btn StatusButtons__Button statusColor--approval'
      onClick={onClickApprovStatus}>Подтвердить прием</button>);
    }
    if (checkStatuses()) {
      buttons.push(<button
      key='reject'
      className='btn StatusButtons__Button statusColor--rejected'
      onClick={onClickRejectStatus}>Отменить прием</button>);
    }
    return buttons;
  };

  return (
    <form className='HomeMeetingFormEdit' onSubmit={onSubmitForm} ref={meetingForm}>
          {innerAllertData.show && <InnerAllert
    title={innerAllertData.title}
    body={innerAllertData.body}
    onClose={() => setInnerAlertData(innerAllertDefault)} onApprove={innerAllertData.onApprove}/>}
    <p>Пациент: {meetingData.patient.user.full_name}</p>
    <p>Жалоба: {meetingData.disease === '' ? 'Не указана' : meetingData.disease}</p>
    <p>Текущий статус: <span className={`HomeMeetingFormEdit__Status statusColor--${meetingData.status}`}>{STATUSES[meetingData.status]}</span></p>
    <p>Телефон: <a href={`tel:${meetingData.patient.user.phone}`}>{meetingData.patient.user.phone}</a></p>
    <p>Email: <a href={`mailto:${meetingData.patient.user.email}`}>{meetingData.patient.user.email}</a></p>

    {checkStatuses() && <div className='HomeMeetingFormEdit__StatusButtons'>
      <p className='HomeMeetingFormEdit__StatusButtons__Title'>Управление статусом:</p>
      {renderStatusButtons()}
    </div>
    }

    {checkStatuses() && <div className='form-group'>
      <label htmlFor='date_of_appointment'>{meetingData.date_of_appointment ? 'Время приема' : 'Назначьте время приема'}</label>
      <Flatpickr
        options={({
          altInput: true,
          altFormat: 'd.m.Y в H:i',
          allowInput: true,
          allowInvalidPreload: true,
          enableTime: true,
          locale: Russian,
          time_24hr: true,
          monthSelectorType: 'static',
          minDate: Date.now(),
          static: false,
        })}
        className="form-control"
        onChange={onChangeDateOfAppointment}
        value={datePicker}
      />
    </div>}
    {!checkStatuses() && <p>
      Назначенное время: {dt.fromISO(meetingData.date_of_appointment).toFormat('dd.MM.yyyy в HH:mm')}</p>}

    {checkStatuses() && <TextAreaFormGroup name='address' label='Адресс места приема' requred={false} extendedClasses=''
    initValue={meetingData.address ? meetingData.address : meetingData.student.work_place}
    onChangeHook={onChangeAddress}/>}

    <div className='row justify-content-around'>
    {checkStatuses() && <button type='submit' className='btn btn-outline-success col-5 HomeMeetingFormEdit__button'>Сохранить</button>}
      <button onClick={onClose} className='btn btn-outline-dark col-5 HomeMeetingFormEdit__button'>Закрыть</button>
    </div>
</form>
  );
}
