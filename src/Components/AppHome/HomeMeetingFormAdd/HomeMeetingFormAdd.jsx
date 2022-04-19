/* eslint-disable camelcase */
import { useState, useRef } from 'react';
import { Russian } from 'flatpickr/dist/l10n/ru';
import Flatpickr from 'react-flatpickr';
import { useDispatch } from 'react-redux';
import InputFormGroup from '../../Base/InputFormGroup/InputFormGroup';
import TextAreaFormGroup from '../../Base/TextAreaFormGroup/TextAreaFormGroup';
import { addStudentMeeting } from '../../../Store/actionCreators';

export default function HomeMeetingFormAdd({ student, onClose }) {
  const dispath = useDispatch();
  const [state, setState] = useState({
    meeting: {
      date_of_appointment: new Date().toJSON(),
      disease: '',
    },
    patient: {
      user: {
        first_name: '',
        last_name: '',
        middle_name: '',
        city: '',
      },
    },
  });
  const meetingForm = useRef();

  const [filterPatients, setFilterPatients] = useState(student.patients);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    dispath(addStudentMeeting(JSON.stringify(state), 'Запись добавлена!'));
  };

  const onChangeEmail = (value) => {
    setState((prev) => ((
      { ...prev, patient: { ...prev.patient, user: { ...prev.patient.user, email: value } } }
    )));
    const patients = student.patients.filter((p) => p.user.email.includes(value));
    setFilterPatients(patients);
  };

  const onChangeFullName = (value) => setState((prev) => {
    const [last_name, first_name, middle_name] = value.split(' ') || '';
    return {
      ...prev,
      patient: {
        ...prev.patient,
        user: {
          ...prev.patient.user, first_name, last_name, middle_name,
        },
      },
    };
  });

  const onChangePhone = (value) => setState((prev) => (({
    ...prev,
    patient: {
      ...prev.patient, user: { ...prev.patient.user, phone: value },
    },
  })));

  const onChangeCity = (value) => setState((prev) => (({
    ...prev,
    patient: {
      ...prev.patient, user: { ...prev.patient.user, city: value },
    },
  })));

  const onChangeDisease = (value) => setState((prev) => (({
    ...prev,
    meeting: { ...prev.meeting, disease: value },
  })));

  const onChangeDateOfAppointment = (dates) => {
    setState((prev) => (({
      ...prev,
      meeting: { ...prev.meeting, date_of_appointment: new Date(dates[0]).toJSON() },
    })));
  };

  return (
    <form className='HomeMeetingFormAdd' onSubmit={onSubmitForm} ref={meetingForm}>
      <h3>Данные пациента</h3>
      <InputFormGroup
      onChangeHook={onChangeEmail}
      name={'email'}
      label='Эл. адрес'
      prompts={filterPatients.filter((p) => p.user.email).map((p) => p.user.email)}
      extendedClasses=''/>

      <InputFormGroup
      onChangeHook={onChangeFullName}
      name={'full_name'}
      label='Полное имя пациента'
      prompts={filterPatients.filter((p) => p.user.full_name).map((p) => p.user.full_name)}
      requred={false}
      extendedClasses=''/>

      <InputFormGroup
      onChangeHook={onChangePhone}
      name={'phone'}
      label='Телефон'
      prompts={filterPatients.filter((p) => p.user.phone).map((p) => p.user.phone)}
      requred={false}
      extendedClasses=''/>

      <InputFormGroup
      onChangeHook={onChangeCity}
      name={'city'}
      label='Город'
      prompts={filterPatients.filter((p) => p.user.city).map((p) => p.user.city)}
      extendedClasses=''/>

      <TextAreaFormGroup
      onChangeHook={onChangeDisease}
      name={'disease'}
      label='Жалоба'
      extendedClasses=''/>

      <div className='form-group'>
      <label htmlFor='date_of_appointment'>Назначенное время</label>
        <Flatpickr
          options={({
            altInput: true,
            altFormat: 'd.m.Y в H:i',
            allowInput: true,
            enableTime: true,
            locale: Russian,
            time_24hr: true,
            monthSelectorType: 'static',
            minDate: Date.now(),
          })}
          className="form-control"
          value={state.meeting.date_of_appointment}
          onChange={onChangeDateOfAppointment}
        />
      </div>
      <div className='row justify-content-around'>
        <button type='submit' className='btn btn-outline-success col-5'>Сохранить</button>
        <button onClick={onClose} className='btn btn-outline-dark col-5'>Закрыть</button>
      </div>
</form>
  );
}
