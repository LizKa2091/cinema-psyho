import { FrownFilled, FrownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { checkFilmStatus, filmDislikeAction } from '../../../utils/filmsList';
import { IFilmsItem } from '../../../types/film.types';

interface IDislikeButtonProps {
   filmData: IFilmsItem;
}

type action = 'add' | 'remove';

const DislikeButton: FC<IDislikeButtonProps> = ({ filmData }) => {
   const [isFilmSaved, setIsFilmSaved] = useState<boolean>(false);

   useEffect(() => {
      const [_, isDisliked] = checkFilmStatus(filmData);
      
      if (isDisliked) setIsFilmSaved(isDisliked);
   }, [filmData.filmId]);

   const handleDislike = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      let filmAction: action  = isFilmSaved ? 'remove' : 'add';
      filmDislikeAction(filmData, filmAction);
      setIsFilmSaved((prev: boolean) => !prev)
   };

   return (
      <Button onClick={handleDislike} size='large' icon={isFilmSaved ? <FrownFilled /> : <FrownOutlined />} title={isFilmSaved ? 'Снова показывать' : 'Не показывать больше'} />
   )
}

export default DislikeButton;