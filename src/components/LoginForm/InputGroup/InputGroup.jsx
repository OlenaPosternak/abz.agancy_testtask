import { Field, ErrorMessage } from 'formik';

import styles from './InputGropu.module.scss';

export const InputFields = ({ errors, touched, isValid }) => {
  return (
    <div className={styles.input_group}>
      <div className={styles.input_container}>
        <Field
          className={`${styles.input} ${
            errors.name && touched.name && !isValid && styles.input_error
          }`}
          type="text"
          name="name"
          placeholder=" "
        />
        <label
          htmlFor="name"
          className={`${styles.label} ${
            errors.name && touched.name && styles.label_error
          }`}
        >
          Your name
        </label>
        <ErrorMessage className={styles.error} name="name" component="div" />
      </div>

      <div className={styles.input_container}>
        <Field
          className={`${styles.input} ${
            errors.email && touched.email && !isValid && styles.input_error
          }`}
          type="text"
          name="email"
          placeholder=" "
        />
        <label
          htmlFor="Email"
          className={`${styles.label} ${
            errors.email && touched.email && styles.label_error
          }`}
        >
          Email
        </label>
        <ErrorMessage className={styles.error} name="email" component="div" />
      </div>

      <div className={styles.input_container}>
        <Field
          className={`${styles.input} ${
            errors.phone && touched.phone && styles.input_error
          }`}
          type="text"
          name="phone"
          placeholder=" "
        />
        <label
          htmlFor="Phone"
          className={`${styles.label} ${
            errors.phone && touched.phone && styles.label_error
          }`}
        >
          Phone
        </label>
        <ErrorMessage className={styles.error} name="phone" component="div" />
      </div>
    </div>
  );
};
