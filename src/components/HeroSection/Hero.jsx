import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div>
        <h1 className={styles.title}>
          Test assignment for front-end developer
        </h1>
        <p className={styles.content}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <a href="#signUp" className="button">
          {' '}
          Sign up
        </a>
      </div>
    </section>
  );
};
