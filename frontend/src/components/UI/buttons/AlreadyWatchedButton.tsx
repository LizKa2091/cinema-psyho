import React, { FC, useState, useEffect, MouseEvent } from 'react';
import { IFilmsItem } from '../../../types/film.types';
import { checkFilmStatus, filmWatchedAction } from '../../../utils/filmsList';
import { Button } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';

interface IAlreadyWatchedButtonProps {
   filmData: IFilmsItem;
}

type action = 'add' | 'remove';

const AlreadyWatchedButton: FC<IAlreadyWatchedButtonProps> = ({ filmData }) => {
   const [isFilmSaved, setIsFilmSaved] = useState<boolean>(false);

   useEffect(() => {
      const [_, __, isFilmWatched] = checkFilmStatus(filmData);
      
      if (isFilmWatched) setIsFilmSaved(isFilmWatched);
   }, [filmData.filmId]);

   const handleWatched = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      let filmAction: action  = isFilmSaved ? 'remove' : 'add';
      filmWatchedAction(filmData, filmAction);
      setIsFilmSaved((prev: boolean) => !prev)
   };

   return (
      <div>
         <Button onClick={handleWatched} size='large' icon={isFilmSaved ? <CheckCircleFilled /> : <CheckCircleOutlined />}>{isFilmSaved ? 'Убрать из просмотренного' : 'Уже смотрел'}</Button>
      </div>
   )
}

export default AlreadyWatchedButton;