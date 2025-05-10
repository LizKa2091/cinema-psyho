import React, { FC, useState } from 'react';
import { IEmotionItem } from '../../types/menu.types';
import { IFilmsItem } from '../../types/film.types';
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
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
               <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', maxWidth: 720, gap: 20 }}>
                  {data?.films.map((filmItem: IFilmsItem) => (
                     <li key={filmItem.filmId} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', border: '1px solid #000', borderRadius: 12, padding: 15, listStyleType: 'none', gap: 5 }}>
                        <p style={{ fontSize: '2rem', fontWeight: 700 }}>{filmItem.nameRu}</p>
                        <p style={{ fontSize: '1.15rem' }}>Описание: {filmItem.description}</p>
                        {filmItem.filmLength ? <p>Длительность фильма: {filmItem.filmLength}</p> : null}
                        <img src={filmItem.posterUrl} alt={filmItem.nameRu} style={{ width: '100%', height: '100%', maxWidth: 420, maxHeight: 800 }}/>
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