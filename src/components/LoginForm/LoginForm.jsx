import * as yup from 'yup';
import { useEffect, useState, createRef } from 'react';

import { fetchPositions, fetchUsers, addUsers } from 'fetchApi/fetchApi';

import { Formik } from 'formik';
import { Field, Form, ErrorMessage } from 'formik';

import styles from './LoginForm.module.scss';
import { Success } from 'components/Success_section/Success';

const emailRegexp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const phoneRegexp = /^\+38\s\((0\d{2})\)\s\d{3}\s-\s\d{2}\s-\s\d{2}$/;
// const phoneRegexpBack = /^[\+]{0,1}380([0-9]{9})$/;

let loginSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Not less than 2 characters')
    .max(60, 'Not more than 60 characters')
    .required('Please enter your name, f.e: John'),
  email: yup
    .string()
    .matches(emailRegexp, 'F.e.:jhon@example.com')
    .required('Please enter your email'),
  phone: yup
    .string()
    .matches(phoneRegexp, '+38 (XXX) XXX - XX - XX')
    .required('Please enter your phone number'),
  position_id: yup.string().required(),
  photo: yup.string().required('Photo is required'),
});

export const LoginForm = ({ setUsers }) => {
  const [positions, setPositions] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const values = {
    name: '',
    email: '',
    phone: '',
    position_id: '1',
    photo: '',
  };

  useEffect(() => {
    fetchPositions().then(data => {
      setPositions(data.positions);
    });
  }, []);

  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    setImgUrl(fileReader.result);
  };

  const handleOnChange = async event => {
    if (event.target.files) {
      const picture = event.target.files[0];
      const size = picture.size;

      if (Number(size) > 5242880) {
        alert(
          `Photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB.`
        );
        return;
      }

      setFile(picture);

      return fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    const phoneNumber = values.phone.replace(/\D/g, '');

    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', phoneNumber);
    formData.append('position_id', values.position_id);
    formData.append('photo', file);

    await addUsers(formData);

    resetForm();
    setFile(null);
    setSuccess(true);
    fetchUsers(1).then(data => setUsers(data.users));
  };
  const ref = createRef();

  return (
    <section className="section">
      <div className="container">
        <h2 id="signUp" className="title" ref={ref}>
          Working with POST request
        </h2>
        <Formik
          initialValues={values}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty, errors, touched }) => {
            return (
              <Form
                autoComplete="off"
                className={styles.form}
                onChange={handleOnChange}
              >
                <div className={styles.input_group}>
                  <div className={styles.input_container}>
                    <Field
                      className={`${styles.input} ${
                        errors.name &&
                        touched.name &&
                        !isValid &&
                        styles.input_error
                      }`}
                      type="text"
                      name="name"
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className={`${styles.label} ${
                        errors.name &&
                        touched.name &&
                        styles.label_error
                      }`}
                    >
                      Your name
                    </label>
                    <ErrorMessage
                      className={styles.error}
                      name="name"
                      component="div"
                    />
                  </div>

                  <div className={styles.input_container}>
                    <Field
                      className={`${styles.input} ${
                        errors.email &&
                        touched.email &&
                        !isValid &&
                        styles.input_error
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
                    <ErrorMessage
                      className={styles.error}
                      name="email"
                      component="div"
                    />
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
                    <ErrorMessage
                      className={styles.error}
                      name="phone"
                      component="div"
                    />
                  </div>
                </div>
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
                <label className={styles.label_file}>
                  <Field
                    className={styles.input_file}
                    type="file"
                    name="photo"
                    accept=".jpg, .jpeg"
                    value={imgUrl ? imgUrl : ''}
                  />
                  <div className={styles.upload}>Upload</div>
                  <div className={styles.upload_file}>
                    <span style={{ display: !file ? 'block' : 'none' }}>
                      Upload your photo
                    </span>
                    {file ? <p>{file.name}</p> : ''}
                  </div>
                </label>
                <div className={styles.btn_wrapper}>
                  <button
                    className="button"
                    type="submit"
                    disabled={!isValid || !dirty}
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
        <Success success={success} />
      </div>
    </section>
  );
};
