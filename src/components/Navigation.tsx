import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined,
  ToolOutlined,
  SafetyCertificateOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/objects',
      icon: <HomeOutlined />,
      label: 'Объекты',
    },
    {
      key: '/clients',
      icon: <TeamOutlined />,
      label: 'Заказчики',
    },
    {
      key: '/contractors',
      icon: <ToolOutlined />,
      label: 'Подрядчики',
    },
    {
      key: '/supervisors',
      icon: <SafetyCertificateOutlined />,
      label: 'Контролирующие',
    },
    {
      key: '/violations',
      icon: <ExclamationCircleOutlined />,
      label: 'Нарушения',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 24px',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
        <Title level={4} style={{ margin: 0, marginRight: '32px', whiteSpace: 'nowrap' }}>
          Build Journal
        </Title>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className='main-menu'
      
        />
      </div>
      
      <Menu
          mode="horizontal"
          items={[
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Выйти',
              onClick: handleLogout,
            },
          ]}
          style={{ 
            borderBottom: 'none',
            background: 'transparent'
          }}
        />
    </Header>
  );
};
