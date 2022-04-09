import './AccountsMenu.css';

export default function AccountsMenu() {
  return (
    <div className="AccountsMenu">
      <a className="AccountsMenu__link AccountsMenu__link_change-email" href="/accounts/email/">Сменить емайл</a>
      <a className="AccountsMenu__link AccountsMenu__link_change-password" href="/accounts/password/change/">Сменить пароль</a>
      <a className="AccountsMenu__link AccountsMenu__link_logout" href="/accounts/logout/">Выйти из аккаунта</a>
    </div>
  );
}
