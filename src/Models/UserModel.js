import PropTypes from 'prop-types';

const UserModel = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string,
  middle_name: PropTypes.string,
  phone: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  avatar: PropTypes.string,
  date_joined: PropTypes.string.isRequired,
  last_login: PropTypes.string,
  is_superuser: PropTypes.bool.isRequired,
  is_staff: PropTypes.bool.isRequired,
  is_active: PropTypes.bool.isRequired,
  student: PropTypes.object,
  patient: PropTypes.object,
};

export default UserModel;
