import { createRef } from 'react';
import styles from './UserList.module.scss';

export const ListOfUsers = ({ users, page, setPage, totalPages }) => {
  const handleClick = async () => {
    setPage(prev => (prev += 1));
  };
  const ref = createRef();
  return (
    <section className="section">
      <div className="container">
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
                  <p>{user.name}</p>
                  <div>
                    <p>{user.position}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                  </div>
                </li>
              ))
            : 'No users here yet'}
        </ul>
        {totalPages > page && <button onClick={handleClick}>Show more</button>}
      </div>
    </section>
  );
};
