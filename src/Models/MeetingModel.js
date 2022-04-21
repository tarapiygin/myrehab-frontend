import PropTypes from 'prop-types';

const MeetingModel = {
  id: PropTypes.number.isRequired,
  address: PropTypes.string,
  date_of_creation: PropTypes.string.isRequired,
  date_of_appointment: PropTypes.string.isRequired,
  disease: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  student: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
};

export default MeetingModel;
