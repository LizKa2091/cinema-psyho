import React, { FC, useState } from 'react';
import { IEmotionItem } from '../../types/menu.types';
import { Select, Form, Button } from 'antd';
import { useForm } from 'react-hook-form';

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
   const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
   const { handleSubmit, setValue } = useForm();

   const onSubmit = (data: any) => {
      setSelectedMoods(data.mood)
   };

   return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onFinish={handleSubmit(onSubmit)}>
            <Form.Item label="Какое у вас настроение?" name='mood' rules={[{ required: true, message: 'Выберите хотя бы одно настроение' }]}>
               <Select mode="multiple" placeholder="Выберите настроение" options={emotions} style={{ minWidth: '250px' }}
                  optionRender={(option) => (
                     <span style={{ color: option.data.color }}>
                        <span>{option.data.emoji}</span>
                        {option.data.label}
                     </span>
                  )}
                  onChange={(( value: any ) => setValue('mood', value))}
               />
            </Form.Item>
            <Button type='primary' htmlType='submit' style={{ width: '50%' }}>Применить</Button>
         </Form>
         {selectedMoods.length > 0 &&
            selectedMoods.map((mood: string) => (
               <p key={mood}>{mood}</p>
            ))
         }
      </div>
   )
}

export default EmotionPicker;