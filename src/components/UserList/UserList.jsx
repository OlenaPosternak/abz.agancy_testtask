import { createRef } from 'react';
import styles from './UserList.module.scss';

export const ListOfUsers = ({ users, page, setPage, totalPages }) => {
  const handleClick = async () => {
    setPage(prev => (prev += 1));
  };
  const ref = createRef();
  return (
    <section className="section">
      <div className={`container ${styles.wrapper}`}>
        <h2 className="title" id="users" ref={ref}>
          Working with GET request
        </h2>
        <ul className={styles.list}>
          {users
            ? users.map(user => (
                <li key={user.id} className={styles.list_item}>
                  <img
                    src={user.photo}
                    className={styles.image}
                    alt="userPhoto"
                  />
                  <p className={styles.user_name}>{user.name}</p>

                  <p className={styles.text}>{user.position}</p>
                  <p className={styles.text}>{user.email}</p>
                  <p className={styles.text}>{user.phone}</p>
                </li>
              ))
            : 'No users here yet'}
        </ul>
        {totalPages > page && <button className='button' onClick={handleClick}>Show more</button>}
      </div>
    </section>
  );
};
