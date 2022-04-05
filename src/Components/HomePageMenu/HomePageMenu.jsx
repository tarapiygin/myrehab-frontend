export default function HomePageMenu(props) {
  const type = props;
  console.log(type);
  return (
    <div className="HomePageMenu">
      <button className="btn HomePageMenu-button" type="button">Личный профиль</button>
      {console.log(type) || type === 'student' || <button className="btn HomePageMenu-button" type="button">Профиль специалиста</button>}
      <button className="btn HomePageMenu-button" type="button">Записи к специалисту</button>
      {type === 'student' || <button className="btn HomePageMenu-button" type="button">Мои пациенты</button>}
    </div>
  )
}