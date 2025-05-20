import React, { FC, useEffect, useState } from 'react';
import { IEmotionItem } from '../../types/menu.types';
import { IFilmsItem } from '../../types/film.types';
import { Select, Button, Spin, Flex, Card, Checkbox } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useFilms } from '../../hooks/useFilms';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '../../utils/formatTime';
import styles from './EmotionPicker.module.scss';
import WatchLaterButton from './buttons/WatchLaterButton';
import DislikeButton from './buttons/DislikeButton';
import { checkFilmStatus } from '../../utils/filmsList';
import AlreadyWatchedButton from './buttons/AlreadyWatchedButton';

interface IFormData {
   moods: string[];
   checkboxes: string[];
}

const emotions: IEmotionItem[] = [
   { value: 'tension', label: 'Тревога/Напряжение', emoji: '😨', color: '#e94560' },
   { value: 'nostalgia', label: 'Ностальгия', emoji: '🕰', color: '#06d6a0' },
   { value: 'euphoria', label: 'Эйфория/Восторг', emoji: '🤩', color: '#ffd166' },
   { value: 'melancholy', label: 'Меланхолия', emoji: '☁️', color: '#9c88ff' },
   { value: 'rage', label: 'Ярость/Бунт', emoji: '💥', color: '#ff6b6b' },
   { value: 'wonder', label: 'Удивление/Чудо', emoji: '✨', color: '#48dbfb' },
   { value: 'loneliness', label: 'Одиночество', emoji: '🌑', color: '#8395a7' },
   { value: 'absurd', label: 'Абсурд/Чёрный юмор', emoji: '🤡', color: '#f368e0' }
];

const checkboxOptions = ['Скрыть, что буду смотреть позже', 'Скрыть непонравившиеся фильмы', 'Скрыть просмотренные фильмы'];

const EmotionPicker: FC = () => { 
   const [selectedMoods, setSelectedMoods] = useState<IEmotionItem[]>([]);
   const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
   const [displayResults, setDisplayResults] = useState<boolean>(false);
   const [filteredFilms, setFilteredFilms] = useState<IFilmsItem[]>([]);

   const navigate = useNavigate();

   const { handleSubmit, control } = useForm<IFormData>();
   const { data, isLoading, isError, isSuccess } = useFilms(selectedMoods.length > 0 ? selectedMoods.map(mood => mood.label).join(',') : '');

   useEffect(() => {
      if (isSuccess && data) {
        const filtered = filterFilms(data.films, selectedCheckboxes);
        setFilteredFilms(filtered);
      }
    }, [data, selectedCheckboxes, isSuccess, displayResults]);

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
         {isLoading && <Spin size='large' className={styles.emotionSpin} />}
         {isError && <p>Ошибка при загрузке фильмов</p>}
         {isSuccess && displayResults && filteredFilms.length > 0 && (
            <Flex justify='center' vertical align='center' gap='middle' className={styles.filmContainer}>
               {filteredFilms.map((filmItem: IFilmsItem) => (
                  <Card key={filmItem.filmId} title={<span className={styles.filmTitle}>{filmItem.nameRu}</span>} className={styles.filmCard} onClick={() => navigate(`/film/${filmItem.filmId}`)}>
                     <p>{filmItem.description}</p>
                     {filmItem.filmLength ? <p>Длительность фильма: {formatTime(filmItem.filmLength)}</p> : null}
                     <Flex justify='center' className={styles.filmImgContainer}>
                        <img src={filmItem.posterUrl} alt={filmItem.nameRu} className={styles.filmImg}/>
                     </Flex>
                     <Flex gap='small' justify='right' className={styles.filmButtonsContainer}>
                        <WatchLaterButton filmData={filmItem} />
                        <DislikeButton filmData={filmItem} />
                        <AlreadyWatchedButton filmData={filmItem} />
                     </Flex>
                  </Card>
               ))}
            </Flex>
         )}
         {isSuccess && data.films.length === 0 && <p>Ничего не найдено</p>}            
      </Flex>
   )
}

export default EmotionPicker;