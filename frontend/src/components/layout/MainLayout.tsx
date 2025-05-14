import React, { FC, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { IMenuItem } from '../../types/menu.types';
import styles from './MainLayout.module.scss';
import { Content } from 'antd/es/layout/layout';

const { Header, Footer } = Layout;

const headerItems: IMenuItem[] = [
   { label: 'Главная', key: 'home', path: '/' },
   { label: 'Профиль', key: 'profile', path: '/profile' },
   { label: 'Аналитика', key: 'analytics', path: '/' },
   { label: 'О создателе', key: 'about', path: '/' }
];

interface IMainLayoutProps {
   children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
   const navigate = useNavigate();

   const handleMenuClick = (path: string) => {
      navigate(path);
   };

   return (
      <Layout>
         <Header className={styles.header}>
            <div className={styles.logo} onClick={() => navigate('/')}>Cinema Psyho</div>
            <Menu className={styles.menu} mode='horizontal'>
               {headerItems.map((item: IMenuItem)=> (
                  <Menu.Item key={item.key} onClick={() => handleMenuClick(item.path)}>
                     {item.label}
                  </Menu.Item>
               ))}
            </Menu>
         </Header>
         <Content>
            {children}
         </Content>
         <Footer className={styles.footer}>
            Cinema Psyho ©2025 Created by LizKa2091 <Link to='https://github.com/LizKa2091'>Github <ExportOutlined /></Link>
         </Footer>
      </Layout>
   )
}

export default MainLayout;