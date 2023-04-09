import { ReactComponent as SuccessIcon } from '../../img/success-image.svg';
import styles from './Success.module.scss';
export const Success = ({ success,  successRef }) => {
  return (
    <div ref={successRef}>
      {success && (
        <div className={styles.success_section}>
          <h2 className="title">User successfully registered</h2>
          <SuccessIcon className={styles.icon} />
        </div>
      )}
    </div>
  );
};
