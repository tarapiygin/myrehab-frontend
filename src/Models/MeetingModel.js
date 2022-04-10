import PropTypes from 'prop-types';

const MeetingModel = {
  id: PropTypes.number.isRequired,
  date_of_creation: PropTypes.string.isRequired,
  date_of_appointment: PropTypes.string.isRequired,
  disease: PropTypes.string.isRequired,
  took_place_student: PropTypes.bool.isRequired,
  approval_student: PropTypes.bool.isRequired,
  rejected_student: PropTypes.bool.isRequired,
  rejected_patient: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  student: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
};

export default MeetingModel;
