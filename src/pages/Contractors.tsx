import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Typography, 
  Tag, 
  Space, 
  Input, 
  Button,
  Avatar,
  Rate
} from 'antd';
import { 
  SearchOutlined, 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined,
  EnvironmentOutlined,
  BuildOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;

interface Contractor {
  id: number;
  name: string;
  company: string;
  specialization: string;
  phone: string;
  email: string;
  address: string;
  license: string;
  rating: number;
  status: 'active' | 'inactive' | 'suspended';
  registrationDate: string;
  completedProjects: number;
  specialties: string[];
}

export const Contractors: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const contractors: Contractor[] = [
    {
      id: 1,
      name: 'Сидоров Владимир Петрович',
      company: 'ООО "СтройМастер"',
      specialization: 'Кровельные работы',
      phone: '+7 (495) 111-22-33',
      email: 'sidorov@stroymaster.ru',
      address: 'Москва, ул. Строительная, 15, оф. 102',
      license: 'СРО-С-123456-2023',
      rating: 4.8,
      status: 'active',
      registrationDate: '2023-02-10',
      completedProjects: 12,
      specialties: ['Кровля', 'Фасад', 'Гидроизоляция']
    },
    {
      id: 2,
      name: 'Козлов Михаил Александрович',
      company: 'ИП Козлов М.А.',
      specialization: 'Электромонтажные работы',
      phone: '+7 (926) 222-33-44',
      email: 'kozlov.electro@mail.ru',
      address: 'Москва, ул. Энергетическая, 25',
      license: 'СРО-Э-234567-2023',
      rating: 4.6,
      status: 'active',
      registrationDate: '2023-01-15',
      completedProjects: 8,
      specialties: ['Электромонтаж', 'Освещение', 'Силовые сети']
    },
    {
      id: 3,
      name: 'Петрова Анна Сергеевна',
      company: 'ООО "ОтделкаПро"',
      specialization: 'Внутренняя отделка',
      phone: '+7 (495) 333-44-55',
      email: 'petrova@otdelkapro.ru',
      address: 'Москва, ул. Мастерская, 45, оф. 305',
      license: 'СРО-О-345678-2023',
      rating: 4.9,
      status: 'active',
      registrationDate: '2022-11-20',
      completedProjects: 18,
      specialties: ['Штукатурка', 'Покраска', 'Плитка', 'Ламинат']
    },
    {
      id: 4,
      name: 'Морозов Игорь Николаевич',
      company: 'АО "ФундаментСтрой"',
      specialization: 'Фундаментные работы',
      phone: '+7 (495) 444-55-66',
      email: 'morozov@fundamentstroi.ru',
      address: 'Московская область, г. Подольск, ул. Бетонная, 100',
      license: 'СРО-Ф-456789-2022',
      rating: 4.7,
      status: 'active',
      registrationDate: '2022-08-12',
      completedProjects: 25,
      specialties: ['Фундамент', 'Бетонирование', 'ЖБИ']
    },
    {
      id: 5,
      name: 'Волков Сергей Дмитриевич',
      company: 'ИП Волков С.Д.',
      specialization: 'Сантехнические работы',
      phone: '+7 (926) 555-66-77',
      email: 'volkov.santeh@gmail.com',
      address: 'Москва, ул. Водопроводная, 78',
      license: 'СРО-С-567890-2023',
      rating: 4.5,
      status: 'inactive',
      registrationDate: '2023-05-08',
      completedProjects: 6,
      specialties: ['Сантехника', 'Отопление', 'Водоснабжение']
    },
    {
      id: 6,
      name: 'Новикова Елена Владимировна',
      company: 'ООО "ДекорСтрой"',
      specialization: 'Декоративные работы',
      phone: '+7 (495) 666-77-88',
      email: 'novikova@dekorstroi.ru',
      address: 'Москва, ул. Дизайнерская, 90, оф. 201',
      license: 'СРО-Д-678901-2023',
      rating: 4.8,
      status: 'active',
      registrationDate: '2023-03-25',
      completedProjects: 15,
      specialties: ['Декоративная штукатурка', 'Лепнина', 'Мозаика']
    },
    {
      id: 7,
      name: 'Лебедев Алексей Иванович',
      company: 'ООО "МеталлСтрой"',
      specialization: 'Металлоконструкции',
      phone: '+7 (495) 777-88-99',
      email: 'lebedev@metallstroi.ru',
      address: 'Московская область, г. Люберцы, ул. Металлистов, 120',
      license: 'СРО-М-789012-2022',
      rating: 4.4,
      status: 'suspended',
      registrationDate: '2022-12-03',
      completedProjects: 9,
      specialties: ['Металлоконструкции', 'Сварка', 'Каркасы']
    },
    {
      id: 8,
      name: 'Козлова Татьяна Петровна',
      company: 'ИП Козлова Т.П.',
      specialization: 'Ландшафтные работы',
      phone: '+7 (926) 888-99-00',
      email: 'kozlovа.landscape@yandex.ru',
      address: 'Москва, ул. Садовая, 150, кв. 45',
      license: 'СРО-Л-890123-2023',
      rating: 4.9,
      status: 'active',
      registrationDate: '2023-07-18',
      completedProjects: 11,
      specialties: ['Ландшафт', 'Озеленение', 'Дорожки', 'Дренаж']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'suspended':
        return 'error';
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
      case 'suspended':
        return 'Приостановлен';
      default:
        return 'Неизвестно';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.7) return '#52c41a';
    if (rating >= 4.3) return '#faad14';
    return '#ff4d4f';
  };

  const filteredContractors = contractors.filter(contractor =>
    contractor.name.toLowerCase().includes(searchText.toLowerCase()) ||
    contractor.company.toLowerCase().includes(searchText.toLowerCase()) ||
    contractor.specialization.toLowerCase().includes(searchText.toLowerCase()) ||
    contractor.email.toLowerCase().includes(searchText.toLowerCase()) ||
    contractor.phone.includes(searchText) ||
    contractor.license.includes(searchText)
  );

  const columns = [
    {
      title: 'Подрядчик',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Contractor) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {record.specialization}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Организация',
      dataIndex: 'company',
      key: 'company',
      render: (text: string, record: Contractor) => (
        <Space>
          <BuildOutlined style={{ color: '#1890ff' }} />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <SafetyCertificateOutlined /> {record.license}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Рейтинг',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Space direction="vertical" size="small">
          <Rate 
            disabled 
            value={rating} 
            style={{ fontSize: '14px' }}
            allowHalf
          />
          <span style={{ 
            fontSize: '12px', 
            color: getRatingColor(rating),
            fontWeight: 'bold'
          }}>
            {rating}/5
          </span>
        </Space>
      ),
      sorter: (a: Contractor, b: Contractor) => a.rating - b.rating,
    },
    {
      title: 'Специализации',
      dataIndex: 'specialties',
      key: 'specialties',
      render: (specialties: string[]) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {specialties.map((specialty, index) => (
            <Tag key={index} color="blue">
              {specialty}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Контакты',
      key: 'contacts',
      render: (record: Contractor) => (
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
      dataIndex: 'completedProjects',
      key: 'completedProjects',
      render: (count: number) => (
        <Tag color={count > 10 ? 'green' : count > 5 ? 'blue' : 'default'}>
          {count} {count === 1 ? 'проект' : count < 5 ? 'проекта' : 'проектов'}
        </Tag>
      ),
      sorter: (a: Contractor, b: Contractor) => a.completedProjects - b.completedProjects,
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
      sorter: (a: Contractor, b: Contractor) => 
        new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime(),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f5f5f5' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, marginBottom: '16px' }}>
          Подрядчики
        </Title>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Search
            placeholder="Поиск по имени, организации, специализации, лицензии..."
            allowClear
            style={{ width: 400 }}
            size="large"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          

        </div>

        <div style={{ marginBottom: '16px', color: '#666' }}>
          Всего подрядчиков: <strong>{contractors.length}</strong> | 
          Найдено: <strong>{filteredContractors.length}</strong>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredContractors}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} из ${total} записей`,
          }}
          scroll={{ x: 1400 }}
          size="middle"
        />
      </Card>
    </div>
  );
};
