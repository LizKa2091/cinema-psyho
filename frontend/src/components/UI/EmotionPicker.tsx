import React, { FC, useEffect, useState } from 'react';
import { IEmotionItem } from '../../types/menu.types';
import { IFilmsItem } from '../../types/film.types';
import { Select, Button, Spin, Flex, Checkbox } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useFilms } from '../../hooks/useFilms';
import { checkFilmStatus } from '../../utils/filmsList';
import { addItemSearchHistory, clearSearchHistory } from '../../features/searchHistory';
import CompactFilmItem from './CompactFilmItem';
import FilmsPagination from './FilmsPagination';
import { emotions } from '../../constants/emotions';
import { checkboxOptions } from '../../constants/checkboxOptions';
import styles from './EmotionPicker.module.scss';

interface IFormData {
   moods: string[];
   checkboxes: string[];
}

const EmotionPicker: FC = () => { 
   const [selectedMoods, setSelectedMoods] = useState<IEmotionItem[]>([]);
   const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
   const [displayResults, setDisplayResults] = useState<boolean>(false);
   const [filteredFilms, setFilteredFilms] = useState<IFilmsItem[]>([]);
   const [currPage, setCurrPage] = useState<number>(1);

   const { handleSubmit, control } = useForm<IFormData>();
   const { data, isLoading, isError, isSuccess } = useFilms(
      selectedMoods.length > 0 ? selectedMoods.map(mood => mood.label).join(',') : '',
      currPage
   );

   useEffect(() => {
      if (isSuccess && data) {
        const filtered = filterFilms(data.films, selectedCheckboxes);
        setFilteredFilms(filtered);
      }
   }, [data, selectedCheckboxes, isSuccess, displayResults]);

   useEffect(() => {
      clearSearchHistory();

      if (selectedMoods.length > 0 && displayResults) {
         selectedMoods.forEach((emotion: IEmotionItem) => addItemSearchHistory(emotion.value));
      }
   }, [selectedMoods, displayResults]);

   const filterFilms = (films: IFilmsItem[], checkboxes: string[]) => {
      if (!films) return [];
      
      return films.filter((film: IFilmsItem) => {
         const [isFilmWatchLater, isFilmDisliked, isFilmWatched] = checkFilmStatus(film);
         
         const shouldHideWatchLater = checkboxes.includes(checkboxOptions[0]);
         const shouldHideDisliked = checkboxes.includes(checkboxOptions[1]);
         const shouldHideWatched = checkboxes.includes(checkboxOptions[2]);
         
         if (shouldHideWatchLater && isFilmWatchLater) return false;
         if (shouldHideDisliked && isFilmDisliked) return false;
         if (shouldHideWatched && isFilmWatched) return false;
         
         return true;
      });
    };

   const onSubmit = (data: IFormData) => {
      if (data.moods && data.moods.length > 0) {
         const selected = emotions.filter(emotion => data.moods.includes(emotion.value));
         setSelectedMoods(selected);
         setDisplayResults(true);
      }
      setSelectedCheckboxes(data.checkboxes || []);
   };

   return (
      <Flex vertical gap='middle'>
         <form onSubmit={handleSubmit(onSubmit)} className={styles.emotionContainer}>
            <Controller name="moods" control={control} rules={{ required: "Выберите хотя бы одно настроение" }} 
               render={({ field, fieldState }) => (
                  <>
                     <label>Какое у вас настроение?</label>
                     <Select {...field} mode="multiple" placeholder="Выберите настроение"
                        options={emotions.map(emotion => ({
                           label: (
                              <span style={{ color: emotion.color }}>
                                 {emotion.emoji} {emotion.label}
                              </span>
                           ),
                           value: emotion.value,
                        }))}
                        className={styles.emotionSelect}
                        onChange={(values) => {
                           field.onChange(values);
                           const selected = emotions.filter(emotion => values.includes(emotion.value));
                           setSelectedMoods(selected);
                        }}
                     />
                     {fieldState.error && <span className={styles.emotionError}>{fieldState.error.message}</span>}
                  </>
               )}
            />
            <Controller name="checkboxes" control={control} render={(({ field }) => (
               <Checkbox.Group options={checkboxOptions} onChange={field.onChange} style={{ display: 'flex', flexDirection: 'column', gap: 10 }} />
            ))}/>
            <Button type='primary' htmlType='submit'>Применить</Button>
         </form>
         {isLoading && displayResults && <Spin size='large' className={styles.emotionSpin} />}
         {isError && <p>Ошибка при загрузке фильмов</p>}
         {isSuccess && displayResults && filteredFilms.length > 0 && (
            <Flex justify='center' vertical align='center' gap='middle' className={styles.filmContainer}>
               {filteredFilms.map((filmItem: IFilmsItem) => 
                  <CompactFilmItem key={filmItem.filmId} filmItem={filmItem} />
               )}
               <FilmsPagination totalItems={data.totalFilmsCount} currPage={currPage} pagesCount={Math.min(data.totalPages, 20)} handlePageChange={setCurrPage} />
            </Flex>
         )}
         {isSuccess && data.films.length === 0 && 
            <Flex justify='center' align='center' vertical gap='small'>
               <p>Ничего не найдено</p>
               <Button onClick={() => setCurrPage(1)}>Вернуться на первую страницу</Button>
            </Flex>
         }            
      </Flex>
   )
}

export default EmotionPicker;