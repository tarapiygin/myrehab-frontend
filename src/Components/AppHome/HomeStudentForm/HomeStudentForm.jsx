import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent } from '../../../Store/actionCreators';
import InputFormGroup from '../../Base/InputFormGroup/InputFormGroup';
import TextAreaFormGroup from '../../Base/TextAreaFormGroup/TextAreaFormGroup';
import SelectFormGroup from '../../Base/SelectFormGroup/SelectFormGroup';
import { ORIGIN } from '../../../API';
import ShareButtons from '../../Base/ShareButtons/ShareButtons';
import styles from './HomeStudentForm.module.css';

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
    <div className='HomeStudentForm commonFormContainer'>
      <h2 className='HomeStudentForm__title'>Профиль специалиста</h2>
      <div className={styles.shareButtons}>
        <p className={styles.profileLink}>
          Профиль: <a target='_blank' href={ORIGIN + student.url} rel='noreferrer'>{ORIGIN + student.url}</a></p>
        <p>Поделитесь Вашим профилем</p>
        <ShareButtons url={ORIGIN + student.url}/>
      </div>
      <div className='rating'>
        <p className='ratingTittle'>Рейтинг:</p>
        </div>
      <form onSubmit={onSubmitForm} ref={formRef}>
        <div className='row' >
          <InputFormGroup name='work_place' label='Место работы' initValue={student.work_place}/>
          <SelectFormGroup name='specialty' label='Специализация' initValue={student.specialty} options={specialties.map((s) => [s.id, s.title])}/>
          <InputFormGroup name='price' label='Стоимость приема' initValue={student.price}/>
          <SelectFormGroup name='price_currency' label='Валюта' initValue={student.price_currency} options={student.price_currencies}/>
          <TextAreaFormGroup name='bio' label='Опыт работы' initValue={student.bio}/>
          <TextAreaFormGroup name='education' label='Курсы реабилитации' initValue={student.education}/>
        </div>
        <button className='btn btn-outline-success mx-auto d-block' type='submit'>Сохранить изменения</button>
      </form>
    </div>
  );
}
