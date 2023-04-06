import { ReactComponent as Logo } from '../../img/Logo.svg';
import styles from './AppBarHeader.module.scss';
import '../../general.scss'

export const AppBar = () => {
  return (
    <header className={`container ${styles.header}`}>
      <Logo />
      <nav className={styles.authNav}>
        <a href='#users' className='button'>Users</a>
        <a href="#signUp" className='button'> Sign up</a>
      </nav>
    </header>
  );
};
