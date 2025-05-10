import React, { FC, useState } from 'react';
import { useFilm } from '../../hooks/useFilm';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Flex } from 'antd';
import { formatTime } from '../../utils/formatTime';
import { ArrowLeftOutlined } from '@ant-design/icons';

const FilmItem: FC = () => {
   const [isFactsOpen, setIsFactsOpen] = useState<boolean>(false);
   const params = useParams();
   const filmId = params.id;

   const { data, isError, isSuccess } = useFilm(filmId || '');
   
   const stripHtml = (html: string) => {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      return temp.textContent || temp.innerText || '';
   }

   if (!filmId) {
      return <p>ID фильма не указан</p>
   }

   return (
      <Flex vertical wrap justify='center' align='center' gap='middle' style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', maxWidth: '720px' }}>
         {isError &&
            <>
               <p style={{ fontSize: '2rem', color: '#ff0000', marginBottom: 10 }}>Ошибка, попробуйте другой фильм</p>
               <Link to='/' style={{ color: '#000' }}>Вернуться назад</Link>
            </>
         }
         {isSuccess && data &&
            <>
               <Link to='/' style={{ color: '#000', position: 'absolute', top: 10, left: 0 }}>
                  <ArrowLeftOutlined style={{ marginRight: 10 }} />
                  Вернуться назад
               </Link>
               <Flex justify='center' vertical gap={10} align='center' style={{ marginTop: 50 }}>
                  <p style={{ fontSize: '2rem', fontWeight: 700 }}>{data.data.nameRu}</p>
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
            </>
         }
         {isSuccess && !data &&
            <p>Фильм не найден</p>
         }
      </Flex>
   )
}

export default FilmItem;