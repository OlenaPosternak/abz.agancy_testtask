import { Field } from 'formik';
import styles from './UploadFile.module.scss';

export const UploadPhoto = ({ imgUrl, file,setFile }) => {
  return (
    <label className={styles.label_file}>
      <Field
        className={styles.input_file}
        type="file"
        name="photo"
        accept=".jpg, .jpeg"
        value={imgUrl ? imgUrl : ''}
        onClick={()=>file && setFile(null)}
      />
      <div className={styles.upload}>Upload</div>
      <div className={styles.upload_file}>
        <span style={{ display: !file ? 'block' : 'none' }}>
          Upload your photo
        </span>
        {file ? <p>{file.name}</p> : ''}
      </div>
    </label>
  );
};
