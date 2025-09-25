import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Typography, 
  Tag, 
  Space, 
  Input, 
  Avatar
} from 'antd';
import { 
  SearchOutlined, 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined,
  EnvironmentOutlined,
  BuildOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;

interface Client {
  id: number;
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  type: 'individual' | 'company';
  status: 'active' | 'inactive';
  registrationDate: string;
  totalProjects: number;
}

export const Clients: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const clients: Client[] = [
    {
      id: 1,
      name: 'Иванов Александр Петрович',
      company: 'ООО "СтройИнвест"',
      position: 'Генеральный директор',
      phone: '+7 (495) 123-45-67',
      email: 'ivanov@stroinvest.ru',
      address: 'Москва, ул. Тверская, 15, оф. 201',
      type: 'company',
      status: 'active',
      registrationDate: '2023-01-15',
      totalProjects: 3
    },
    {
      id: 2,
      name: 'Петрова Мария Сергеевна',
      company: 'ИП Петрова М.С.',
      position: 'Индивидуальный предприниматель',
      phone: '+7 (926) 234-56-78',
      email: 'petrova.m@mail.ru',
      address: 'Москва, ул. Арбат, 25',
      type: 'individual',
      status: 'active',
      registrationDate: '2023-03-22',
      totalProjects: 1
    },
    {
      id: 3,
      name: 'Сидоров Дмитрий Владимирович',
      company: 'АО "ЖилСтрой"',
      position: 'Директор по развитию',
      phone: '+7 (495) 345-67-89',
      email: 'sidorov@zhilstroy.ru',
      address: 'Москва, Ленинский проспект, 100, оф. 501',
      type: 'company',
      status: 'active',
      registrationDate: '2022-11-08',
      totalProjects: 5
    },
    {
      id: 4,
      name: 'Козлова Елена Александровна',
      company: 'ООО "Недвижимость Плюс"',
      position: 'Коммерческий директор',
      phone: '+7 (495) 456-78-90',
      email: 'kozlova@nedvizhplus.ru',
      address: 'Москва, ул. Новый Арбат, 30, оф. 1205',
      type: 'company',
      status: 'inactive',
      registrationDate: '2023-06-14',
      totalProjects: 2
    },
    {
      id: 5,
      name: 'Морозов Игорь Николаевич',
      company: 'ИП Морозов И.Н.',
      position: 'Индивидуальный предприниматель',
      phone: '+7 (926) 567-89-01',
      email: 'morozov.igor@gmail.com',
      address: 'Московская область, г. Химки, ул. Центральная, 45',
      type: 'individual',
      status: 'active',
      registrationDate: '2023-08-03',
      totalProjects: 1
    },
    {
      id: 6,
      name: 'Волкова Анна Дмитриевна',
      company: 'ООО "СтройГарант"',
      position: 'Менеджер по проектам',
      phone: '+7 (495) 678-90-12',
      email: 'volkova@stroigarant.ru',
      address: 'Москва, ул. Кутузовский проспект, 20, оф. 305',
      type: 'company',
      status: 'active',
      registrationDate: '2023-04-18',
      totalProjects: 4
    },
    {
      id: 7,
      name: 'Новиков Сергей Петрович',
      company: 'АО "МегаСтрой"',
      position: 'Главный инженер',
      phone: '+7 (495) 789-01-23',
      email: 'novikov@megastroy.ru',
      address: 'Москва, ул. Садовое кольцо, 75, оф. 808',
      type: 'company',
      status: 'active',
      registrationDate: '2022-09-12',
      totalProjects: 7
    },
    {
      id: 8,
      name: 'Лебедева Ольга Викторовна',
      company: 'ИП Лебедева О.В.',
      position: 'Индивидуальный предприниматель',
      phone: '+7 (926) 890-12-34',
      email: 'lebedova.olga@yandex.ru',
      address: 'Москва, ул. Ленинский проспект, 150, кв. 45',
      type: 'individual',
      status: 'inactive',
      registrationDate: '2023-07-25',
      totalProjects: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активный';
      case 'inactive':
        return 'Неактивный';
      default:
        return 'Неизвестно';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'company':
        return 'blue';
      case 'individual':
        return 'green';
      default:
        return 'default';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'company':
        return 'Организация';
      case 'individual':
        return 'Физ. лицо';
      default:
        return 'Неизвестно';
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchText.toLowerCase()) ||
    client.company.toLowerCase().includes(searchText.toLowerCase()) ||
    client.email.toLowerCase().includes(searchText.toLowerCase()) ||
    client.phone.includes(searchText)
  );

  const columns = [
    {
      title: 'Контактное лицо',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Client) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.position}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Организация',
      dataIndex: 'company',
      key: 'company',
      render: (text: string, record: Client) => (
        <Space>
          <BuildOutlined style={{ color: '#1890ff' }} />
          <div>
            <div>{text}</div>
            <Tag color={getTypeColor(record.type)}>
              {getTypeText(record.type)}
            </Tag>
          </div>
        </Space>
      ),
    },
    {
      title: 'Контакты',
      key: 'contacts',
      render: (record: Client) => (
        <Space direction="vertical" size="small">
          <Space>
            <PhoneOutlined style={{ color: '#52c41a' }} />
            <span style={{ fontSize: '12px' }}>{record.phone}</span>
          </Space>
          <Space>
            <MailOutlined style={{ color: '#faad14' }} />
            <span style={{ fontSize: '12px' }}>{record.email}</span>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => (
        <Space>
          <EnvironmentOutlined style={{ color: '#722ed1' }} />
          <span style={{ fontSize: '12px' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Проекты',
      dataIndex: 'totalProjects',
      key: 'totalProjects',
      render: (count: number) => (
        <Tag color={count > 0 ? 'blue' : 'default'}>
          {count} {count === 1 ? 'проект' : count < 5 ? 'проекта' : 'проектов'}
        </Tag>
      ),
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f5f5f5' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, marginBottom: '16px' }}>
          Заказчики
        </Title>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Search
            placeholder="Поиск по имени, организации, телефону или email..."
            allowClear
            style={{ width: 400 }}
            size="large"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          
        </div>

        <div style={{ marginBottom: '16px', color: '#666' }}>
          Всего заказчиков: <strong>{clients.length}</strong> | 
          Найдено: <strong>{filteredClients.length}</strong>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredClients}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} из ${total} записей`,
          }}
          scroll={{ x: 1200 }}
          size="middle"
        />
      </Card>
    </div>
  );
};
