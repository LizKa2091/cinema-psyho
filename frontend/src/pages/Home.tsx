import React, { FC } from 'react';
import { Flex } from 'antd';
import styles from './Home.module.scss';
import EmotionPicker from '../components/UI/EmotionPicker';

const MainPage: FC = () => {
   return (
      <Flex justify='center' align='center' gap='medium' className={styles.container}>
         <EmotionPicker />
      </Flex>
   )
};

export default MainPage;