import PropTypes from 'prop-types';

const MeetingModel = {
  id: PropTypes.number.isRequired,
  address: PropTypes.string,
  date_of_creation: PropTypes.string.isRequired,
  date_of_appointment: PropTypes.string,
  disease: PropTypes.string,
  status: PropTypes.string,
  student: PropTypes.object,
  patient: PropTypes.object,
};

export default MeetingModel;
