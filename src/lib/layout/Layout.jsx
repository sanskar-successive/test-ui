import React from 'react';
import LayoutHeader from './components/header/Header';
import Sidebar from './components/sider/Sidebar';
import PageContent from './components/content/Content';
import { Layout, Content, message } from '../generics';
import useFetchUserAccount from '../../module/user/hooks/useFetchUserAccount';
import { UserService } from '../../module/user/Service';


const PageLayout = ({ content }) => {


  const checkAuth = async () => {
    try {
      const { data } = await UserService.getUserAccount();
      if(data){
        window.location.assign('/');
      }
    } catch (error) {
      message.error('something went wrong')
      window.location.assign('/login')
    }
  }

  if (window.location.pathname === '/login') {
    checkAuth();
  }


  return (
    <Layout>
      <LayoutHeader />
      <Layout>
        <Sidebar />
        <Layout>
          <Content>{content}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default PageLayout;
