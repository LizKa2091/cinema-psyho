import React, { FC, useEffect, useState } from 'react';
import { useFilm } from '../../hooks/useFilm';
import { Link } from 'react-router-dom';
import { Button, Flex } from 'antd';
import { formatTime } from '../../utils/formatTime';
import styles from './FilmItem.module.scss';

interface IFilmItemProps {
   filmId: string;
}

const FilmItem: FC<IFilmItemProps> = ({ filmId }) => {
   const [isFactsOpen, setIsFactsOpen] = useState<boolean>(false);

   const { data, isError, isSuccess } = useFilm(filmId || '');
   
   useEffect(() => {
      setIsFactsOpen(false);
   }, [filmId]);

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
               <img src={data.data.posterUrl} alt={data.data.nameRu} width='100%'/>
            </Flex>
         }
         {isSuccess && !data &&
            <p>Фильм не найден</p>
         }
      </Flex>
   )
}

export default FilmItem;