import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Login } from './pages/Login';
import { Objects } from './pages/Objects';
import { ObjectDetail } from './pages/ObjectDetail';
import { Clients } from './pages/Clients';
import { Contractors } from './pages/Contractors';
import { Supervisors } from './pages/Supervisors';
import { Violations } from './pages/Violations';
import { Navigation } from './components/Navigation';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider locale={ruRU}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <Layout>
                <Navigation />
                <Content>
                  <Navigate to="/objects" replace />
                </Content>
              </Layout>
            } />
            <Route path="/objects" element={
              <Layout>
                <Navigation />
                <Content>
                  <Objects />
                </Content>
              </Layout>
            } />
            <Route path="/objects/:id" element={
              <Layout>
                <Navigation />
                <Content>
                  <ObjectDetail />
                </Content>
              </Layout>
            } />
            <Route path="/clients" element={
              <Layout>
                <Navigation />
                <Content>
                  <Clients />
                </Content>
              </Layout>
            } />
            <Route path="/contractors" element={
              <Layout>
                <Navigation />
                <Content>
                  <Contractors />
                </Content>
              </Layout>
            } />
            <Route path="/supervisors" element={
              <Layout>
                <Navigation />
                <Content>
                  <Supervisors />
                </Content>
              </Layout>
            } />
            <Route path="/violations" element={
              <Layout>
                <Navigation />
                <Content>
                  <Violations />
                </Content>
              </Layout>
            } />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
