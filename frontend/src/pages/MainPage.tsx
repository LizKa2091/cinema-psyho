import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import styles from './MainPage.module.scss';
import { Link } from 'react-router-dom';
import { IMenuItem } from '../types/menu.types';

const { Header, Content, Footer } = Layout;

const headerItems: IMenuItem[] = [
   { label: 'Главная', key: 'home' },
   { label: 'Аналитика', key: 'analytics' },
   { label: 'О создателе', key: 'about' }
];

const MainPage: FC = () => {
   return (
      <Layout>
         <Header className={styles.header}>
            <div className={styles.logo}>Cinema Psyho</div>
            <Menu className={styles.menu} items={headerItems} mode='horizontal'/>
         </Header>
         <Content className={styles['main-page__content']}>

         </Content>
         <Footer style={{ textAlign: 'center' }}>
            Cinema Psyho ©2025 Created by LizKa2091 <Link to='https://github.com/LizKa2091'>Github <ExportOutlined /></Link>
         </Footer>
      </Layout>
   )
};

export default MainPage;