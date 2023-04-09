import { useState, createRef } from 'react';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

import { fetchUsers, addUsers } from 'fetchApi/fetchApi';
import { loginSchema } from 'validationSchema/addUser';
import { Success } from 'components/Success_section/Success';
import { UserPositions } from './UserPosition/UserPosition';
import { RegisterBtn } from 'components/LoginForm/SignUpBtn/SignUpBtn';

import styles from './LoginForm.module.scss';
import { InputFields } from './InputGroup/InputGroup';
import { UploadPhoto } from './UploadFile/UploadFile';

export const LoginForm = ({ setUsers, totalPages, setPage }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const ref = createRef();

  const values = {
    name: '',
    email: '',
    phone: '',
    position_id: '1',
    photo: '',
  };

  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    setImgUrl(fileReader.result);
  };

  const handleOnChange = async event => {
    if (event.target.files) {
      if (file) {
        setFile(null);
      }

      const picture = event.target.files[0];
      const size = picture.size;

      if (Number(size) > 5242880) {
        toast.error(
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

    // delating of all symbols and adding +
    const phoneNumber = '+' + values.phone.replace(/\D/g, '');

    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', phoneNumber);
    formData.append('position_id', values.position_id);
    formData.append('photo', file);

    try {
      await addUsers(formData);

      resetForm();
      setFile(null);
      setSuccess(true);
      fetchUsers(1).then(data => {
        setUsers(data.users);
        setPage(1);
      });

      // closing the notification
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.log(`submit error`, error);
    }
  };

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
                <InputFields
                  errors={errors}
                  isValid={isValid}
                  touched={touched}
                />
                <UserPositions />
                <UploadPhoto imgUrl={imgUrl} file={file} setFile={setFile} />
                <RegisterBtn isValid={isValid} dirty={dirty} />
              </Form>
            );
          }}
        </Formik>
        <Success success={success} />
      </div>
    </section>
  );
};
