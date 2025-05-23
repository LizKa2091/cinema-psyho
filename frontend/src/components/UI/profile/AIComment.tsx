import { Card, Tag } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useGenerateFilmComment } from '../../../hooks/useGenerateFilmComment';
import { generateAIprompt } from '../../../utils/generateAIprompt';
import styles from './AIComment.module.scss';

interface IAICommentProps {
   filmId: number;
   nameRu: string;
   description: string;
   filmType: string;
}

const AIComment: FC<IAICommentProps> = ({ filmId, nameRu, description, filmType }) => {
   const [comment, setComment] = useState<string>('');

   const { mutate } = useGenerateFilmComment();

   useEffect(() => {
      const prompt = generateAIprompt(filmId, nameRu, description, filmType);

      mutate(prompt, {
         onSuccess: (data) => setComment(data.result || data.message || 'ошибка'),
         onError: (error) => setComment(error.message || 'ошибка')
      });
   }, [filmId, nameRu, description, filmType, mutate]);

   return (
      <Card title="Анализ AI" className={styles.AICard} extra={<Tag color="geekblue">GPT-4o mini</Tag>}>
         {comment}
      </Card>
   )
}

export default AIComment;