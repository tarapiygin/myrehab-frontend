import UserModel from '../../Models/UserModel';

export default function HomeUserContainer(user) {
  console.log(user);
  return (
    <div className="HomeUserContainer">
      <h2 className="HomeUserContainer-title">Общая информация</h2>
    </div>
  );
}

HomeUserContainer.propTypes = UserModel;
