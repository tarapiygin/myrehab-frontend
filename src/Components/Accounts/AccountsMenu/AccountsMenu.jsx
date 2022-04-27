import styles from './AccountsMenu.module.css';

export default function AccountsMenu() {
  return (
    <div className={styles.AccountsMenu}>
      <a className={styles.menuLink} href="/accounts/email/">Сменить емайл</a>
      <a className={styles.menuLink} href="/accounts/password/change/">Сменить пароль</a>
      <a className={styles.menuLink} href="/accounts/logout/">Выйти из аккаунта</a>
    </div>
  );
}
