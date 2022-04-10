import PropTypes from 'prop-types';

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
};

export default StudentModel;
