import logo from '../blocks/header/logo.svg';
function Header (props) {
  return (
    <header className='header'>
      <img className='logo' src={logo} alt='логотип' />
      <div className='header__auth'>
        {props.children}
      </div>
    </header>);
}

export default Header;
