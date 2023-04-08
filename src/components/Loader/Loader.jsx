import { ReactComponent as PreLoader } from '../../img/preLoader.svg';
import styles from './Loader.module.scss';

export const Loader =()=>{
    return(
        <div className={styles.loader_box}>
            <PreLoader className={styles.spin}/>
        </div>
    )
}