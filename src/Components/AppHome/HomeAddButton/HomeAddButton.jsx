import './HomeAddButton.css';

export default function HomeAddButton({ onClick, text }) {
  return (
  <div className='HomeAddButtonContainer'>
    <button onClick={onClick} className='Kalend__button Kalend__ButtonBase-border Kalend__ButtonBase HomeAddButton'>{text}</button>
  </div>
  );
}
