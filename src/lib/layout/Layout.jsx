import React from 'react';
import LayoutHeader from './components/header/Header';
import Sidebar from './components/sider/Sidebar';
import PageContent from './components/content/Content';
import { Layout } from '../generics';


const PageLayout = ({content}) => {
  return (
    <Layout>
      <LayoutHeader/>
      <Layout>
        <Sidebar/>
        <Layout>
          <PageContent>{content}</PageContent>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default PageLayout;
