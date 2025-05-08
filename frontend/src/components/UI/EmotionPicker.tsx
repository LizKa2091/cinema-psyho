import React, { FC, useState } from 'react';
import { IEmotionItem, IFilmItem } from '../../types/menu.types';
import { Select, Button, Spin } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import EmotionFrame from './EmotionFrame';
import { useFilms } from '../../hooks/useFilms';

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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                           style={{ minWidth: '250px', marginBottom: '16px' }}
                           onChange={(values) => {
                              field.onChange(values);
                              const selected = emotions.filter(emotion => values.includes(emotion.value));
                              setSelectedMoods(selected);
                           }}
                        />
                        {fieldState.error && <span style={{ color: 'red' }}>{fieldState.error.message}</span>}
                     </>
                  )}
               />
               <Button type='primary' htmlType='submit' style={{ width: '50%' }}>Применить</Button>
            </form>
         </div>
         {isDisplayingMoods && <EmotionFrame moods={selectedMoods} />}
         {isLoading && <Spin size='large' style={{ top: '70%', left: '50%' }} />}
         {isError && <p>Ошибка при загрузке фильмов</p>}
         <div>
            {isSuccess && data.films.length > 0 && (
               <ul>
                  {data?.films.map((filmItem: IFilmItem) => (
                     <li key={filmItem.filmId}>
                        <p>Название фильма: {filmItem.nameRu}</p>
                        <p>Описание: {filmItem.description}</p>
                        {filmItem.filmLength ? <p>Длительность фильма: {filmItem.filmLength}</p> : null}
                        <div>
                           Постер фильма:
                           <img src={filmItem.posterUrl} alt={filmItem.nameRu}/>
                        </div>
                     </li>
                  ))}
               </ul>
            )}
            {isSuccess && data.films.length === 0 &&
               <p>Ничего не найдено</p>
            }            
         </div>
      </div>
   )
}

export default EmotionPicker;