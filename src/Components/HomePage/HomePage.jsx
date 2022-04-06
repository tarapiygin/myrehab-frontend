import HomePatientMeetings from '../HomePatientMeetings/HomePatientMeetings';
import HomeStudentContainer from '../HomeStudentContainer/HomeStudentContainer';
import HomeStudentMeetings from '../HomeStudentMeetings/HomeStudentMeetings';
import HomeUserContainer from '../HomeUserContainer/HomeUserContainer';
import HomePageMenu from '../HomePageMenu/HomePageMenu';

import testData from '../../testdata.json';

export default function HomePage() {
  const data = testData;
  const menuProps = { type: 'student' };
  return (
    <div className='home'>
      <div className='HomePage container'>
        <h1 className='HomePage-title'>Личный кабинет</h1>
        <HomePageMenu />
        <HomeUserContainer {...data.data.user}/>
        <HomeStudentContainer />
        <HomeStudentMeetings />
        <HomePatientMeetings />
      </div>
    </div>
  );
}
