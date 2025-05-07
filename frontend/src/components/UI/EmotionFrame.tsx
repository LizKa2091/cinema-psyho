import React, { FC, useEffect, useState } from 'react'
import { Spin } from 'antd';
import { IEmotionItem } from '../../types/menu.types';

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
      <div style={{ position: 'absolute', top: 0, left: 0,background: `linear-gradient(to bottom, black, ${queue[0].color})`, color: `${queue[0].color}`, width: '100dvw', height: '100dvh', zIndex: 1 }}>
         <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 100 }}>{queue[0].emoji} <br /> {queue[0].label}</div>
         <Spin size='large' style={{ top: '70%', left: '50%' }} />
      </div>
   )
}

export default EmotionFrame;