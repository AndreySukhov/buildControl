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
  BuildOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;

interface Supervisor {
  id: number;
  name: string;
  position: string;
  department: string;
  organization: string;
  phone: string;
  email: string;
  address: string;
  license: string;
  status: 'active' | 'inactive' | 'on_vacation';
  registrationDate: string;
  inspectionsCount: number;
  lastInspection: string;
  specialties: string[];
}

export const Supervisors: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const supervisors: Supervisor[] = [
    {
      id: 1,
      name: 'Смирнов Андрей Владимирович',
      position: 'Главный государственный инспектор',
      department: 'Управление государственного строительного надзора',
      organization: 'Государственная жилищная инспекция г. Москвы',
      phone: '+7 (495) 777-88-99',
      email: 'smirnov@gzhi.mos.ru',
      address: 'Москва, ул. Тверская, 13, оф. 501',
      license: 'ГСН-001-2023',
      status: 'active',
      registrationDate: '2023-01-15',
      inspectionsCount: 45,
      lastInspection: '2024-01-15',
      specialties: ['Строительный надзор', 'Градостроительство', 'Согласования']
    },
    {
      id: 2,
      name: 'Козлова Елена Петровна',
      position: 'Ведущий специалист',
      department: 'Отдел технического надзора',
      organization: 'Ростехнадзор',
      phone: '+7 (495) 666-77-88',
      email: 'kozlovа@rostehnadzor.gov.ru',
      address: 'Москва, ул. Вавилова, 38, стр. 1',
      license: 'РТН-002-2023',
      status: 'active',
      registrationDate: '2023-02-20',
      inspectionsCount: 38,
      lastInspection: '2024-01-10',
      specialties: ['Технический надзор', 'Безопасность', 'Экспертиза']
    },
    {
      id: 3,
      name: 'Петров Дмитрий Александрович',
      position: 'Государственный инспектор',
      department: 'Управление экологического надзора',
      organization: 'Росприроднадзор',
      phone: '+7 (495) 555-66-77',
      email: 'petrov@rpn.gov.ru',
      address: 'Москва, ул. Б. Грузинская, 4/6',
      license: 'РПН-003-2023',
      status: 'active',
      registrationDate: '2023-03-10',
      inspectionsCount: 32,
      lastInspection: '2024-01-08',
      specialties: ['Экологический надзор', 'Охрана окружающей среды', 'Экспертиза']
    },
    {
      id: 4,
      name: 'Морозова Анна Сергеевна',
      position: 'Старший инспектор',
      department: 'Отдел пожарного надзора',
      organization: 'ГУ МЧС России по г. Москве',
      phone: '+7 (495) 444-55-66',
      email: 'morozova@mchs.mos.ru',
      address: 'Москва, ул. Пречистенка, 22/2',
      license: 'МЧС-004-2023',
      status: 'on_vacation',
      registrationDate: '2022-11-15',
      inspectionsCount: 52,
      lastInspection: '2023-12-20',
      specialties: ['Пожарный надзор', 'Безопасность', 'Противопожарные мероприятия']
    },
    {
      id: 5,
      name: 'Волков Сергей Николаевич',
      position: 'Инспектор по охране труда',
      department: 'Управление государственной инспекции труда',
      organization: 'Роструд',
      phone: '+7 (495) 333-44-55',
      email: 'volkov@rostrud.gov.ru',
      address: 'Москва, ул. Ильинка, 21',
      license: 'РТ-005-2023',
      status: 'active',
      registrationDate: '2023-04-05',
      inspectionsCount: 28,
      lastInspection: '2024-01-12',
      specialties: ['Охрана труда', 'Трудовое право', 'Безопасность работ']
    },
    {
      id: 6,
      name: 'Новикова Ольга Владимировна',
      position: 'Главный эксперт',
      department: 'Отдел экспертизы проектной документации',
      organization: 'ГАУ "Мосгосэкспертиза"',
      phone: '+7 (495) 222-33-44',
      email: 'novikova@mosgosexpertiza.ru',
      address: 'Москва, ул. Арбат, 35, стр. 1',
      license: 'МГЭ-006-2023',
      status: 'active',
      registrationDate: '2023-05-20',
      inspectionsCount: 41,
      lastInspection: '2024-01-05',
      specialties: ['Экспертиза проектов', 'Строительные нормы', 'Сметы']
    },
    {
      id: 7,
      name: 'Лебедев Игорь Петрович',
      position: 'Инспектор по санитарному надзору',
      department: 'Управление Роспотребнадзора по г. Москве',
      organization: 'Роспотребнадзор',
      phone: '+7 (495) 111-22-33',
      email: 'lebedev@rospotrebnadzor.mos.ru',
      address: 'Москва, ул. Графский пер., 4/9',
      license: 'РПН-007-2023',
      status: 'inactive',
      registrationDate: '2022-09-10',
      inspectionsCount: 35,
      lastInspection: '2023-11-15',
      specialties: ['Санитарный надзор', 'Гигиена', 'Эпидемиология']
    },
    {
      id: 8,
      name: 'Козлов Александр Дмитриевич',
      position: 'Инспектор по энергетическому надзору',
      department: 'Отдел энергетического надзора',
      organization: 'Ростехнадзор',
      phone: '+7 (495) 999-88-77',
      email: 'kozlov@rostehnadzor.gov.ru',
      address: 'Москва, ул. Вавилова, 38, стр. 1',
      license: 'РТН-008-2023',
      status: 'active',
      registrationDate: '2023-06-15',
      inspectionsCount: 29,
      lastInspection: '2024-01-18',
      specialties: ['Энергетический надзор', 'Электробезопасность', 'Теплоснабжение']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'on_vacation':
        return 'warning';
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
      case 'on_vacation':
        return 'В отпуске';
      default:
        return 'Неизвестно';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'inactive':
        return <ClockCircleOutlined style={{ color: '#d9d9d9' }} />;
      case 'on_vacation':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      default:
        return null;
    }
  };

  const filteredSupervisors = supervisors.filter(supervisor =>
    supervisor.name.toLowerCase().includes(searchText.toLowerCase()) ||
    supervisor.position.toLowerCase().includes(searchText.toLowerCase()) ||
    supervisor.department.toLowerCase().includes(searchText.toLowerCase()) ||
    supervisor.organization.toLowerCase().includes(searchText.toLowerCase()) ||
    supervisor.email.toLowerCase().includes(searchText.toLowerCase()) ||
    supervisor.phone.includes(searchText) ||
    supervisor.license.includes(searchText)
  );

  const columns = [
    {
      title: 'Инспектор',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Supervisor) => (
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
      key: 'organization',
      render: (record: Supervisor) => (
        <Space direction="vertical" size="small">
          <div>
            <BuildOutlined style={{ color: '#1890ff' }} />
            <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{record.organization}</span>
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginLeft: '16px' }}>
            {record.department}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginLeft: '16px' }}>
            <SafetyCertificateOutlined /> {record.license}
          </div>
        </Space>
      ),
    },
    {
      title: 'Специализации',
      dataIndex: 'specialties',
      key: 'specialties',
      render: (specialties: string[]) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {specialties.map((specialty, index) => (
            <Tag key={index} color="purple">
              {specialty}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Контакты',
      key: 'contacts',
      render: (record: Supervisor) => (
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
        <Space>
          {getStatusIcon(status)}
          <Tag color={getStatusColor(status)}>
            {getStatusText(status)}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Проверки',
      key: 'inspections',
      render: (record: Supervisor) => (
        <Space direction="vertical" size="small">
          <Tag color={record.inspectionsCount > 40 ? 'green' : record.inspectionsCount > 30 ? 'blue' : 'default'}>
            <FileTextOutlined /> {record.inspectionsCount} проверок
          </Tag>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Последняя: {new Date(record.lastInspection).toLocaleDateString('ru-RU')}
          </div>
        </Space>
      ),
      sorter: (a: Supervisor, b: Supervisor) => a.inspectionsCount - b.inspectionsCount,
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
      sorter: (a: Supervisor, b: Supervisor) => 
        new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime(),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f5f5f5' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, marginBottom: '16px' }}>
          Контролирующие органы
        </Title>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Search
            placeholder="Поиск по имени, должности, организации, лицензии..."
            allowClear
            style={{ width: 400 }}
            size="large"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          
        </div>

        <div style={{ marginBottom: '16px', color: '#666' }}>
          Всего инспекторов: <strong>{supervisors.length}</strong> | 
          Найдено: <strong>{filteredSupervisors.length}</strong>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredSupervisors}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} из ${total} записей`,
          }}
          scroll={{ x: 1600 }}
          size="middle"
        />
      </Card>
    </div>
  );
};
