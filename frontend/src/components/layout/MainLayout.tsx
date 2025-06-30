import React, { FC, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { IMenuItem } from '../../types/menu.types';
import styles from './MainLayout.module.scss';

const { Header, Footer, Content } = Layout;

const headerItems: IMenuItem[] = [
   { label: 'Главная', key: 'home', path: '/' },
   { label: 'Профиль', key: 'profile', path: '/profile' },
   { label: 'Аналитика', key: 'analytics', path: '/profile' },
   { label: 'О создателе', key: 'about', path: '/' }
];

interface IMainLayoutProps {
   children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
   const navigate = useNavigate();

   const menuItems = headerItems.map((item: IMenuItem) => ({
      key: item.key,
      label: item.label,
      onClick: () => handleMenuClick(item.path),
   }));

   const handleMenuClick = (path: string) => {
      navigate(path);
   };

   return (
      <Layout>
         <Header className={styles.header}>
            <div className={styles.logo} onClick={() => navigate('/')} data-testid="logo">
               <h1 className={styles.title}>Cinema Psyho</h1>
            </div>
            <Menu className={styles.menu} mode='horizontal' items={menuItems} />
         </Header>
         <Content>
            {children}
         </Content>
         <Footer className={styles.footer}>
            Cinema Psyho ©2025 Created by LizKa2091 <Link to='https://github.com/LizKa2091' target='_blank' data-testid='footer-link'>Github <ExportOutlined /></Link>
         </Footer>
      </Layout>
   )
}

export default MainLayout;