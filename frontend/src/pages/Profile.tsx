import React, { FC } from 'react';
import FilmsByCategory from '../components/UI/profile/FilmsByCategory';
import styles from './Profile.module.scss';
import MoodChart from '../components/UI/profile/MoodChart';

const Profile: FC = () => {
   return (
      <main className={styles.main}>
         <h1>Профиль</h1>
         <MoodChart />
         <FilmsByCategory />
      </main>
   )
}

export default Profile;