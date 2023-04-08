import styles from './SignUpBtn.module.scss';

export const RegisterBtn = ({ isValid, dirty }) => {
  return (
    <div className={styles.btn_wrapper}>
      <button className="button" type="submit" disabled={!isValid || !dirty}>
        Sign up
      </button>
    </div>
  );
};
