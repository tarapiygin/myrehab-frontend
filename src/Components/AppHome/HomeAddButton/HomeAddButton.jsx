import styles from './HomeAddButton.module.css';

export default function HomeAddButton({ onClick, text }) {
  return (
  <div className={styles.container}>
    <button onClick={onClick} className={`Kalend__button Kalend__ButtonBase-border Kalend__ButtonBase ${styles.button}`}>{text}</button>
  </div>
  );
}
