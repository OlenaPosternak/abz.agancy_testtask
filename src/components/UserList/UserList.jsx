import { createRef } from 'react';
import styles from './UserList.module.scss';

export const ListOfUsers = ({ users, page, setPage, totalPages }) => {
  const handleClick = async () => {
    setPage(prev => (prev += 1));
  };
  const ref = createRef();

  const formatedNumber = number => {
    if (number) {
      const countryCode = number.slice(0, 3);
      const operatorCode = number.slice(3, 6);
      const firstBlock = number.slice(6, 9);

      const secondBlock = number.slice(9, 11);
      const thirdBlock = number.slice(11, 13);
      const formattedPhoneNumber = `${countryCode} (${operatorCode}) ${firstBlock} ${secondBlock} ${thirdBlock}`;

      return formattedPhoneNumber;
    }
  };

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
                  <div className={styles.tooltip__wrapper}>
                    <p className={styles.user_name} tooltip={user.name}>
                      {user.name}
                    </p>
                  </div>

                  <p className={styles.text}>{user.position}</p>
                  <div className={styles.tooltip__wrapper}>
                    <p className={styles.text} tooltip={user.email}>
                      {user.email}
                    </p>
                  </div>
                  <p className={styles.text}>{formatedNumber(user.phone)}</p>
                </li>
              ))
            : 'No users here yet'}
        </ul>
        {totalPages > page && (
          <button className="button" onClick={handleClick}>
            Show more
          </button>
        )}
      </div>
    </section>
  );
};
