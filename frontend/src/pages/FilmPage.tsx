import { Flex, Layout, Menu } from 'antd';
import React, { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FilmItem from '../components/UI/FilmItem';
import { ArrowLeftOutlined, ExportOutlined } from '@ant-design/icons';
import Recommendations from '../components/UI/Recommendations';
import { Footer, Header } from 'antd/es/layout/layout';
import { IMenuItem } from '../types/menu.types';
import styles from './FilmPage.module.scss';

const headerItems: IMenuItem[] = [
   { label: 'Главная', key: 'home' },
   { label: 'Аналитика', key: 'analytics' },
   { label: 'О создателе', key: 'about' }
];

const FilmPage: FC = () => {
   const navigate = useNavigate();
   const params = useParams();
   const filmId = params.id;

   if (!filmId) {
      return <p>ID фильма не указан</p>
   }

   return (
      <Layout>
         <Header className={styles.header}>
            <div className={styles.logo} onClick={ () => navigate('/') }>Cinema Psyho</div>
            <Menu className={styles.menu} items={headerItems} mode='horizontal'/>
         </Header>
         <Flex vertical gap='large' className={styles.main}>
            <Link to='/' className={styles.mainButton}>
               <ArrowLeftOutlined className={styles.arrowIcon} />
               Вернуться назад
            </Link>
            <FilmItem filmId={filmId} />
            <Recommendations filmId={filmId}/>
         </Flex>
         <Footer className={styles.footer}>
            Cinema Psyho ©2025 Created by LizKa2091 <Link to='https://github.com/LizKa2091'>Github <ExportOutlined /></Link>
         </Footer>
      </Layout>
   )
};

export default FilmPage;