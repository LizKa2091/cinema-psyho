import React, { FC, useState } from 'react';
import { IEmotionItem } from '../../types/menu.types';
import { IFilmsItem } from '../../types/film.types';
import { Select, Button, Spin, Flex, Card } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import EmotionFrame from './EmotionFrame';
import { useFilms } from '../../hooks/useFilms';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '../../utils/formatTime';
import styles from './EmotionPicker.module.scss';

interface IFormData {
   moods: string[];
}

const emotions: IEmotionItem[] = [
   { value: 'tension', label: 'Тревога/Напряжение', emoji: '😨', color: '#e94560' },
   { value: 'nostalgia', label: 'Ностальгия', emoji: '🕰️', color: '#06d6a0' },
   { value: 'euphoria', label: 'Эйфория/Восторг', emoji: '🤩', color: '#ffd166' },
   { value: 'melancholy', label: 'Меланхолия', emoji: '☁️', color: '#9c88ff' },
   { value: 'rage', label: 'Ярость/Бунт', emoji: '💥', color: '#ff6b6b' },
   { value: 'wonder', label: 'Удивление/Чудо', emoji: '✨', color: '#48dbfb' },
   { value: 'loneliness', label: 'Одиночество', emoji: '🌑', color: '#8395a7' },
   { value: 'absurd', label: 'Абсурд/Чёрный юмор', emoji: '🤡', color: '#f368e0' }
];

const EmotionPicker: FC = () => { 
   const [selectedMoods, setSelectedMoods] = useState<IEmotionItem[]>([]);
   const [isDisplayingMoods, setIsDisplayingMoods] = useState<boolean>(false);
   const navigate = useNavigate();

   const { handleSubmit, control } = useForm<IFormData>();
   const { data, isLoading, isError, isSuccess } = useFilms(selectedMoods.length > 0 ? selectedMoods.map(mood => mood.label).join(',') : '');

   const onSubmit = (data: IFormData) => {
      if (data.moods && data.moods.length > 0) {
         const selected = emotions.filter(emotion => data.moods.includes(emotion.value));
         setSelectedMoods(selected);
         setIsDisplayingMoods(true);
      }
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
            <Button type='primary' htmlType='submit'>Применить</Button>
         </form>
         {isDisplayingMoods && <EmotionFrame moods={selectedMoods} />}
         {isLoading && <Spin size='large' className={styles.emotionSpin} />}
         {isError && <p>Ошибка при загрузке фильмов</p>}
         {isSuccess && data.films.length > 0 && (
            <Flex justify='center' vertical align='center' gap='middle' className={styles.filmContainer}>
               {data?.films.map((filmItem: IFilmsItem) => (
                  <Card key={filmItem.filmId} title={<span className={styles.filmTitle}>{filmItem.nameRu}</span>} className={styles.filmCard} onClick={() => navigate(`/film/${filmItem.filmId}`)}>
                     <p>{filmItem.description}</p>
                     {filmItem.filmLength ? <p>Длительность фильма: {formatTime(filmItem.filmLength)}</p> : null}
                     <Flex justify='center' className={styles.filmImgContainer}>
                        <img src={filmItem.posterUrl} alt={filmItem.nameRu} className={styles.filmImg}/>
                     </Flex>
                  </Card>
               ))}
            </Flex>
         )}
         {isSuccess && data.films.length === 0 &&
            <p>Ничего не найдено</p>
         }            
      </Flex>
   )
}

export default EmotionPicker;