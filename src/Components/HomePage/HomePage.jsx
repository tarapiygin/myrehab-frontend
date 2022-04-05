import HomePatientMeetings from "../HomePatientMeetings/HomePatientMeetings";
import HomeStudentContainer from "../HomeStudentContainer/HomeStudentContainer";
import HomeStudentMeetings from "../HomeStudentMeetings/HomeStudentMeetings";
import HomeUserContainer from "../HomeUserContainer/HomeUserContainer";
import HomePageMenu from "../HomePageMenu/HomePageMenu";


export default function HomePage(props) {
  const item = props;
  const menuProps = { type: 'student' }
  return (
    <div className="home">
      <div className="HomePage container">
        <h1 className="HomePage-title">Личный кабинет</h1>
        <HomePageMenu student />
        <HomeUserContainer />
        <HomeStudentContainer />
        <HomeStudentMeetings />
        <HomePatientMeetings />
      </div>
    </div>
  )
}