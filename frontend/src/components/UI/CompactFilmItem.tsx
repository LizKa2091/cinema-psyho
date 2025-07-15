import { Card, Flex } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import WatchLaterButton from './buttons/WatchLaterButton';
import DislikeButton from './buttons/DislikeButton';
import AlreadyWatchedButton from './buttons/AlreadyWatchedButton';
import { formatTime } from '../../utils/formatTime';
import { IFilmsItem } from '../../types/film.types';
import styles from './CompactFilmItem.module.scss';

interface ICompactFilmItemProps {
   filmItem: IFilmsItem;
}

const CompactFilmItem: FC<ICompactFilmItemProps> = ({ filmItem }) => {
   const navigate = useNavigate();

   return (
      <Card key={filmItem.filmId} onClick={() => navigate(`/film/${filmItem.filmId}`)} title={<span className={styles.filmTitle}>{filmItem.nameRu}</span>} data-testid='film-item-card' className={styles.filmCard}>
         <p>{filmItem.description}</p>
         {filmItem.filmLength ? <p>Длительность фильма: {formatTime(filmItem.filmLength)}</p> : null}
         <Flex justify='center' className={styles.filmImgContainer}>
            <img src={filmItem.posterUrl} alt={filmItem.nameRu} className={styles.filmImg} />
         </Flex>
         <Flex gap='small' justify='right' className={styles.filmButtonsContainer}>
            <WatchLaterButton filmData={filmItem} />
            <DislikeButton filmData={filmItem} />
            <AlreadyWatchedButton filmData={filmItem} />
         </Flex>
      </Card>
   )
}

export default CompactFilmItem;