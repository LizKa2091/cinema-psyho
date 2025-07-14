import { Flex } from 'antd';
import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import FilmItem from '../components/UI/FilmItem';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Recommendations from '../components/UI/Recommendations';
import styles from './Film.module.scss';

const Film: FC = () => {
   const params = useParams();
   const filmId = params.id;

   if (!filmId) {
      return <p>ID фильма не указан</p>
   }

   return (
      <Flex vertical gap='large' className={styles.main} data-testid='film-item'>
         <Link to='/' className={styles.mainButton} data-testid='go-back-button' aria-label='Вернуться назад'>
            <ArrowLeftOutlined className={styles.arrowIcon} />
            Вернуться назад
         </Link>
         <FilmItem filmId={filmId} />
         <Recommendations filmId={filmId}/>
      </Flex>
   )
};

export default Film;