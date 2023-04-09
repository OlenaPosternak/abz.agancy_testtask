import { Hero } from 'components/HeroSection/Hero';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { ListOfUsers } from '../../components/UserList/UserList';
import { Loader } from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../fetchApi/fetchApi';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers(1).then(data => {
      setUsers(data.users);
      setTotalPages(data.total_pages);
      setIsLoading(true);
    });
  }, []);

  useEffect(() => {
    if (page !== 1) {
      fetchUsers(page).then(data => {
        setUsers(prev => [...prev, ...data.users]);
      });
    }
  }, [page]);

  return (
    <main className={styles.wrapper}>
      {!isLoading ? (
        <Loader />
      ) : (
        <>
          <Hero />
          <ListOfUsers
            users={users}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
          <LoginForm setUsers={setUsers} setPage={setPage} />
        </>
      )}
    </main>
  );
};
