import PropTypes from 'prop-types';
import UserModel from './UserModel';

const PatientModel = {
  id: PropTypes.number.isRequired,
  user: PropTypes.exact(UserModel),
};

export default PatientModel;
