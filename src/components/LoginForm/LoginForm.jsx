import { useEffect, useState, createRef } from 'react';

import { fetchPositions, fetchUsers, addUsers } from 'fetchApi/fetchApi';

import { Formik } from 'formik';
import { Field, Form, ErrorMessage } from 'formik';
// import * as yup from 'yup';

// const emailRegexp =
//   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
// const phoneRegexp = /^[\+]{0,1}380([0-9]{9})$/;

// let loginSchema = yup.object().shape({
//   name: yup.string().min(2).max(60).required(),
//   email: yup.string().matches(emailRegexp).required(),
//   phone: yup.string().matches(phoneRegexp).required(),
//   position_id: yup.string().required(),
//   photo: yup.string().required(),
// });

export const LoginForm = ({ setUsers }) => {
  const [positions, setPositions] = useState([]);

  const values = {
    name: '',
    email: '',
    phone: '',
    position_id: '',
    photo: '',
  };

  useEffect(() => {
    fetchPositions().then(data => {
      setPositions(data.positions);
    });
  }, []);

  const [file, setFile] = useState();

  const onChangePhoto = async event => {
    event.preventDefault();

    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('position_id', values.position_id);
    formData.append('photo', file);

    await addUsers(formData);

    resetForm();
    fetchUsers(1).then(data => setUsers(data.users));
  };
  const ref = createRef();

  return (
    <>
      <h2 id="signUp" ref={ref}>
        Working with POST request
      </h2>
      <Formik
        initialValues={values}
        // validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <Field type="text" name="name" placeholder="Your name" />
          <ErrorMessage name="name" component="div" />

          <Field type="text" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />

          <Field type="text" name="phone" placeholder="Phone" />
          <ErrorMessage name="email" component="div" />
          <div>
            {positions.map(pos => (
              <div key={pos.id}>
                <Field
                  type="radio"
                  name="position_id"
                  value={pos.id.toString()}
                  id={pos.name}
                />
                <label htmlFor={pos.name}>
                  <span>{pos.name}</span>
                </label>
              </div>
            ))}
          </div>
          <Field
            type="file"
            name="photo"
            accept=".jpg, .jpeg"
            onChange={onChangePhoto}
          />
          <button type="submit">Send message</button>
        </Form>
      </Formik>
    </>
  );
};
