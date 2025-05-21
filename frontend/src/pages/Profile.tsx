import React, { FC } from 'react';
import FilmsByCategory from '../components/UI/profile/FilmsByCategory';
import styles from './Profile.module.scss';

const Profile: FC = () => {
   return (
      <main className={styles.main}>
         <h1>Профиль</h1>
         <FilmsByCategory />
      </main>
   )
}

export default Profile;