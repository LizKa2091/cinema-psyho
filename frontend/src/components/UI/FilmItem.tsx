import React, { FC } from 'react';
import { useFilm } from '../../hooks/useFilm';
import { useParams } from 'react-router-dom';

const FilmItem: FC = () => {
   const params = useParams();
   const filmId = params.id;

   const { data, isError, isSuccess } = useFilm(filmId || '');
   
   if (!filmId) {
      return <p>ID фильма не указан</p>
   }

   return (
      <div>
         {isError &&
            <p>ошибка</p>
         }
         {isSuccess && data &&
            <>
               <p>{data.data.nameRu}</p>
               <p>{data.data.description}</p>
               <p>{data.data.year} год</p>
               <p>Длительность фильма: {data.data.filmLength}</p>
               <div>
                  {data.data.facts.map((fact: string) => (
                     <p>{fact}</p>
                  ))}
               </div>
               <img src={data.data.posterUrl} alt={data.data.nameRu} />
            </>
         }
         {isSuccess && !data &&
            <p>Фильм не найден</p>
         }
      </div>
   )
}

export default FilmItem;