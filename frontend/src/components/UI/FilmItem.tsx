import React, { FC, useEffect, useState } from 'react';
import { useFilm } from '../../hooks/useFilm';
import { Link } from 'react-router-dom';
import { Button, Flex } from 'antd';
import { formatTime } from '../../utils/formatTime';
import styles from './FilmItem.module.scss';
import { useFilmTrailer } from '../../hooks/useFilmTrailer';
import { IFilmTrailerItem } from '../../types/film.types';
import { YoutubeFilled } from '@ant-design/icons';

interface IFilmItemProps {
   filmId: string;
}

const FilmItem: FC<IFilmItemProps> = ({ filmId }) => {
   const [isFactsOpen, setIsFactsOpen] = useState<boolean>(false);
   const [filteredTrailers, setFilteredTrailers] = useState<IFilmTrailerItem[]>([]);

   const { data: filmTrailers, isError: isTrailerError } = useFilmTrailer(filmId || '');
   const { data, isError, isSuccess } = useFilm(filmId || '');
   
   useEffect(() => {
      setIsFactsOpen(false);
   }, [filmId]);

   useEffect(() => {
      if (filmTrailers && filmTrailers.items?.length > 0) {
         const filteredArr = filmTrailers.items.filter((item: IFilmTrailerItem) => item.site === 'YOUTUBE').slice(0, 3);
         setFilteredTrailers(filteredArr);
      }
   }, [filmTrailers])

   const stripHtml = (html: string) => {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      return temp.textContent || temp.innerText || '';
   }

   return (
      <Flex vertical wrap justify='center' align='center' gap='middle'>
         {isError &&
            <>
               <p className={styles.filmError}>Ошибка, попробуйте другой фильм</p>
               <Link to='/' className={styles.filmBack}>Вернуться назад</Link>
            </>
         }
         {isSuccess && data &&
            <Flex justify='center' vertical gap={10} align='center' className={styles.filmContainer}>
               <p className={styles.filmTitle}>{data.data.nameRu}</p>
               <p>{data.data.description}</p>
               <p>{data.data.year} год</p>
               {data.data.filmLength ? <p>Длительность фильма: {formatTime(data.data.filmLength)}</p> : null}
               {data.data.webUrl && <Link to={data.data.webUrl} target='_blank'>Посмотреть на кинопоиске</Link>}
               {data.data.facts.length > 0 &&
                  <Flex vertical justify='center' align='center' gap='small'>
                     Интересные факты
                     <Button onClick={() => setIsFactsOpen(!isFactsOpen)}>{isFactsOpen ? 'Скрыть' : 'Раскрыть'}</Button>
                     {isFactsOpen &&
                        data.data.facts.map((fact: string) => (
                           <p key={fact}>{stripHtml(fact)}</p>
                        ))
                     }
                  </Flex>
               }
               <img src={data.data.posterUrl} alt={data.data.nameRu} width='100%' />
               {filmTrailers && filteredTrailers.length > 0 && (
                  <>
                     <h2 className={styles.header}>Трейлеры YouTube<YoutubeFilled /></h2>
                     {filteredTrailers.map((trailer: IFilmTrailerItem, index) => (
                        <div key={trailer.url} className={styles.videoContainer}>
                           <iframe src={trailer.url} title={`${trailer.site}${index}`} className={styles.videoFrame} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                     ))}
                  </>
               )}
               {isTrailerError &&
                  <span>Возникла ошибка при отображении трейлеров</span>
               }
            </Flex>
         }
         {isSuccess && !data &&
            <p>Фильм не найден</p>
         }
      </Flex>
   )
}

export default FilmItem;