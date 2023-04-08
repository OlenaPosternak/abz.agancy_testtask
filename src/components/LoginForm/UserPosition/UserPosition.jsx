import { useEffect, useState } from 'react';
import { fetchPositions } from 'fetchApi/fetchApi';
import { Field } from 'formik';

import styles from './UserPosition.module.scss';

export const UserPositions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetchPositions().then(data => {
      setPositions(data.positions);
    });
  }, []);

  return (
    <div>
      <p className={styles.form_title}>Select your position</p>
      {positions.map(pos => (
        <div key={pos.id}>
          <label className={styles.checkbox_label}>
            <Field
              className={styles.checkbox}
              type="radio"
              name="position_id"
              value={pos.id.toString()}
              id={pos.name}
            />
            <span className={styles.checkbox_icon}></span>
            <span className={styles.checkbox_icon__checked}></span>
            {pos.name}
          </label>
        </div>
      ))}
    </div>
  );
};
