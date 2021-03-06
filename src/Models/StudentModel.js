import PropTypes from 'prop-types';
import PatientModel from './PatientModel';

const StudentModel = {
  id: PropTypes.number.isRequired,
  work_place: PropTypes.string,
  bio: PropTypes.string,
  education: PropTypes.string,
  rating: PropTypes.number,
  specialty: PropTypes.number,
  school: PropTypes.number,
  price: PropTypes.number,
  price_currency: PropTypes.string,
  price_currencies: PropTypes.array,
  vk_link: PropTypes.string,
  tg_link: PropTypes.string,
  inst_link: PropTypes.string,
  patients: PropTypes.arrayOf(PropTypes.exact(PatientModel)),
};

export default StudentModel;
