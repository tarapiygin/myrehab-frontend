import PropTypes from 'prop-types';

const UserModel = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  middle_name: PropTypes.string,
  phone: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  avatar: PropTypes.string,
  date_joined: PropTypes.string,
  last_login: PropTypes.string,
  is_superuser: PropTypes.bool,
  is_staff: PropTypes.bool,
  is_active: PropTypes.bool,
};

export default UserModel;
