import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent } from '../../../Store/actionCreators';
import InputFormGroup from '../../Base/InputFormGroup/InputFormGroup';
import TextAreaFormGroup from '../../Base/TextAreaFormGroup/TextAreaFormGroup';
import SelectFormGroup from '../../Base/SelectFormGroup/SelectFormGroup';

export default function HomeStudentForm() {
  const student = useSelector((state) => state.data.student);
  const specialties = useSelector((state) => state.data.specialties);
  const dispath = useDispatch();

  const formRef = useRef(null);

  const onSubmitForm = async (e = null) => {
    if (e) e.preventDefault();
    const formData = new FormData(formRef.current);
    dispath(updateStudent(formData));
  };

  return (
    <div className="HomeStudentForm commonFormContainer">
      <h2 className="HomeStudentForm__title">Профиль специалиста</h2>
      <form onSubmit={onSubmitForm} ref={formRef}>
        <div className="row" >
          <InputFormGroup name='work_place' label='Место работы' initValue={student.work_place}/>
          <SelectFormGroup name='specialty' label='Специализация' initValue={student.specialty} options={specialties.map((s) => [s.id, s.title])}/>
          <InputFormGroup name='price' label='Стоимость приема' initValue={student.price}/>
          <SelectFormGroup name='price_currency' label='Валюта' initValue={student.price_currency} options={student.price_currencies}/>
          <TextAreaFormGroup name='bio' label='Опыт работы' initValue={student.bio}/>
          <TextAreaFormGroup name='education' label='Курсы реабилитации' initValue={student.education}/>
        </div>
        <button className="btn btn-outline-success mx-auto d-block" type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
}
