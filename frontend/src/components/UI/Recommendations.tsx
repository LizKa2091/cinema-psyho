import { Carousel, Flex } from 'antd';
import React, { FC } from 'react';
import { useFilmsAlike } from '../../hooks/useFilmsAlike';
import { IFilmAlike } from '../../types/film.types';
import './Recommendations.scss';
import { useNavigate } from 'react-router-dom';

interface IRecommendationsProps {
   filmId: string;
}

const Recommendations: FC<IRecommendationsProps> = ({ filmId }) => {
   const { data, isSuccess, isError } = useFilmsAlike(+filmId);
   const navigate = useNavigate();

   return (
      <Flex vertical gap='middle' style={{ cursor: 'pointer' }}>
         {isError && <p>Произошла ошибка при загрузке похожих фильмов</p>}
         {isSuccess && data?.total === 0 ? (
            <p>Похожие фильмы не найдены</p>
         ) : (
            isSuccess && data &&
               <>
                  <h2>Похожие фильмы</h2>
                  <Carousel dots={false} slidesToShow={3} arrows infinite={false}>
                     {data.items.map((filmItem: IFilmAlike) => ( 
                        <Flex key={filmItem.nameRu} onClick={() => navigate(`/film/${filmItem.filmId}`)}> 
                           <img src={filmItem.posterUrl} alt={filmItem.nameRu} style={{ width: '100%', height: 320 }}/> 
                           <p style={{ fontSize: '1.15rem', fontWeight: 700, textAlign: 'center' }}>{filmItem.nameRu}</p>
                        </Flex> 
                     ))} 
                  </Carousel>
               </>
         )}
      </Flex>
   )
}

export default Recommendations;