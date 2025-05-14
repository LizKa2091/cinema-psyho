import React, { FC, useEffect, useState } from 'react'
import { Spin } from 'antd';
import { IEmotionItem } from '../../types/menu.types';
import styles from './EmotionFrame.module.scss'

interface IEmotionFrameProps {
   moods: IEmotionItem[];
}

const EmotionFrame: FC<IEmotionFrameProps> = ({ moods }) => {
   const [queue, setQueue] = useState<IEmotionItem[]>([]);

   useEffect(() => {
      setQueue(moods);
   }, [moods]);

   useEffect(() => {
      if (queue.length > 0) {
         setTimeout(() => {
            setQueue((prevQueue) => prevQueue.slice(1));
         }, 3000);
      }
   }, [queue])

   if (queue.length === 0) {
      return null;
   }

   return (
      <div className={styles.emotionContainer} style={{ background: `linear-gradient(to bottom, black, ${queue[0].color})`, color: `${queue[0].color}` }}>
         <div className={styles.emotionLabel}>{queue[0].emoji} <br /> {queue[0].label}</div>
         <Spin className={styles.emotionSpin} size='large' />
      </div>
   )
}

export default EmotionFrame;