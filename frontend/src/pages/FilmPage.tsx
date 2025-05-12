import { Flex, Layout, Menu } from 'antd';
import React, { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FilmItem from '../components/UI/FilmItem';
import { ArrowLeftOutlined, ExportOutlined } from '@ant-design/icons';
import Recommendations from '../components/UI/Recommendations';
import { Footer, Header } from 'antd/es/layout/layout';
import { IMenuItem } from '../types/menu.types';
import './FilmPage.scss';

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
         <Header className='header'>
            <div className='logo' onClick={ () => navigate('/') }>Cinema Psyho</div>
            <Menu className='menu' items={headerItems} mode='horizontal'/>
         </Header>
         <Flex vertical gap='large' style={{ margin: '0 auto', paddingBottom: 25, maxWidth: 720 }}>
            <Link to='/' style={{ color: '#000', position: 'absolute', top: 10, left: 10 }}>
               <ArrowLeftOutlined style={{ marginRight: 10 }} />
               Вернуться назад
            </Link>
            <FilmItem filmId={filmId} />
            <Recommendations filmId={filmId}/>
         </Flex>
         <Footer style={{ textAlign: 'center' }}>
            Cinema Psyho ©2025 Created by LizKa2091 <Link to='https://github.com/LizKa2091'>Github <ExportOutlined /></Link>
         </Footer>
      </Layout>
   )
};

export default FilmPage;