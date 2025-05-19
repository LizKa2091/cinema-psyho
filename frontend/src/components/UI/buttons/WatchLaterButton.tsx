import React, { FC, useEffect, useState, MouseEvent } from 'react';
import { IFilmsItem } from '../../../types/film.types';
import { Button } from 'antd';
import { BookFilled, BookOutlined } from '@ant-design/icons';
import { checkFilmStatus, filmWatchLaterAction } from '../../../utils/filmsList';

interface IWatchLaterButtonProps {
   filmData: IFilmsItem;
}

type action = 'add' | 'remove';

const WatchLaterButton: FC<IWatchLaterButtonProps> = ({ filmData }) => {
   const [isFilmSaved, setIsFilmSaved] = useState<boolean>(false);

   useEffect(() => {
      const [isWatchLater] = checkFilmStatus(filmData);

      if (isWatchLater) setIsFilmSaved(isWatchLater);
   }, [filmData.filmId]);

   const handleFilmAction = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      let filmAction: action  = isFilmSaved ? 'remove' : 'add';
      filmWatchLaterAction(filmData, filmAction);

      setIsFilmSaved((prev) => !prev);
   };

   return (
      <Button onClick={handleFilmAction} size='large' icon={isFilmSaved ? <BookFilled /> : <BookOutlined />} title={isFilmSaved ? 'Убрать из просмотра позже' : 'Добавить в просмотр позже'}/>
   )
}

export default WatchLaterButton;