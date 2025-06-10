import { Carousel, Flex } from 'antd';
import React, { FC } from 'react';
import { useFilmsAlike } from '../../hooks/useFilmsAlike';
import { IFilmAlike } from '../../types/film.types';
import { useNavigate } from 'react-router-dom';
import styles from './Recommendations.module.scss';

interface IRecommendationsProps {
   filmId: string;
}

const Recommendations: FC<IRecommendationsProps> = ({ filmId }) => {
   const { data, isSuccess, isError } = useFilmsAlike(+filmId);
   const navigate = useNavigate();

   return (
      <Flex vertical gap='middle' className={styles.mainContainer}>
         {isError && <p>Произошла ошибка при загрузке похожих фильмов</p>}
         {isSuccess && data?.total === 0 ? (
            <p className={styles.error}>Похожие фильмы не найдены</p>
         ) : (
            isSuccess && data &&
               <>
                  <h2>Похожие фильмы</h2>
                  <Carousel dots={false} slidesToShow={3} arrows infinite={false}>
                     {data.items.map((filmItem: IFilmAlike) => ( 
                        <Flex className={styles.container} key={filmItem.nameRu} onClick={() => navigate(`/film/${filmItem.filmId}`)}> 
                           <img src={filmItem.posterUrl} alt={filmItem.nameRu} className={styles.filmImg} /> 
                           <p className={styles.filmName}>{filmItem.nameRu}</p>
                        </Flex> 
                     ))} 
                  </Carousel>
               </>
         )}
      </Flex>
   )
}

export default Recommendations;