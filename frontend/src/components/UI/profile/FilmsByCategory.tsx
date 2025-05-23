import { BookOutlined, CheckCircleOutlined, FrownOutlined } from '@ant-design/icons';
import { Flex, Tabs } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import { ISavedCategoriesItem } from '../../../types/profile.types';
import { IFilmsItem } from '../../../types/film.types';
import { filmsListByType } from '../../../utils/filmsList';
import CompactFilmItem from '../CompactFilmItem';
import AIComment from './AIComment';
import styles from './FilmsByCategory.module.scss';

const categories: ISavedCategoriesItem[] = [
   { value: 'watchLater', label: 'Хочу посмотреть позже', icon: <BookOutlined /> },
   { value: 'disliked', label: 'Не понравилось', icon: <FrownOutlined /> },
   { value: 'alreadyWatched', label: 'Уже смотрел', icon: <CheckCircleOutlined /> }
];

const FilmsByCategory: FC = () => {
   const [watchLaterFilms, setWatchLaterFilms] = useState<IFilmsItem[]>([]);
   const [dislikedFilms, setDislikedFilms] = useState<IFilmsItem[]>([]);
   const [watchedFilms, setWatchedFilms] = useState<IFilmsItem[]>([]);

   useEffect(() => {
      setWatchLaterFilms(filmsListByType('watchLaterList'));
      setDislikedFilms(filmsListByType('dislikedList'));
      setWatchedFilms(filmsListByType('watchedList'));
   }, []);

   const displayFilms = (films: IFilmsItem[], category: string) => {
      if (films.length === 0) return <span>В этой категории у вас нет сохранённных фильмов</span>
      
      return (
         <Flex vertical gap='middle'>
            {films.map((film: IFilmsItem) => (
               <Flex justify='space-around' align='center' className={styles.filmItem}>
                  <CompactFilmItem filmItem={film} />
                  <AIComment filmId={film.filmId} nameRu={film.nameRu} description={film.description} filmType={category}/>
               </Flex>
            ))}
         </Flex>
      )
   };

   const tabItems = categories.map((category: ISavedCategoriesItem) => ({
      label: (
         <span>{category.label} {category.icon}</span>
      ),
      key: category.value,
      children: displayFilms(category.value === 'watchLater' ? watchLaterFilms : 
         category.value === 'disliked' ? dislikedFilms :
         watchedFilms, category.value
      )
   }));

   return (
      <Flex vertical>
         <h2>Сохранённые фильмы</h2>
         <Tabs defaultActiveKey='watchLater' items={tabItems} />
      </Flex>
   )
}

export default FilmsByCategory;