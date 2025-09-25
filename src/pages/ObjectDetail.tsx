import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Progress, 
  Avatar, 
  List, 
  Button, 
  Space,
  Timeline,
  Badge,
  Tooltip
} from 'antd';
import { 
  ArrowLeftOutlined, 
  UserOutlined, 
  CalendarOutlined, 
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { ObjectMap } from '../components/ObjectMap';
import { OBJECTS_MOCK } from '../mocks/objects';

const { Title, Text, Paragraph } = Typography;

interface ObjectWorker {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
}

interface ObjectTask {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  assignee: string;
  dueDate: string;
}

interface ObjectMilestone {
  date: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
}

export const ObjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Имитация данных объекта недвижимости
  const object = OBJECTS_MOCK.find((obj) => obj.id === Number(id)) || OBJECTS_MOCK[0];

  // 🎯 Генерируем случайный прогресс, если его нет в данных
  const progress = Math.floor(Math.random() * 100);

  const workers: ObjectWorker[] = [
    { id: 1, name: 'Александр Иванов', role: 'Главный инженер', status: 'online' },
    { id: 2, name: 'Мария Петрова', role: 'Прораб', status: 'online' },
    { id: 3, name: 'Дмитрий Сидоров', role: 'Архитектор', status: 'away' },
    { id: 4, name: 'Елена Козлова', role: 'Сметчик', status: 'offline' },
    { id: 5, name: 'Игорь Морозов', role: 'Технический надзор', status: 'online' },
    { id: 6, name: 'Анна Волкова', role: 'Менеджер проекта', status: 'online' },
    { id: 7, name: 'Сергей Новиков', role: 'Снабженец', status: 'offline' },
    { id: 8, name: 'Ольга Лебедева', role: 'Бухгалтер', status: 'away' }
  ];

  const recentTasks: ObjectTask[] = [
    { id: 1, title: 'Заливка фундамента', status: 'completed', assignee: 'Александр Иванов', dueDate: '2023-08-15' },
    { id: 2, title: 'Возведение каркаса', status: 'in-progress', assignee: 'Мария Петрова', dueDate: '2024-03-20' },
    { id: 3, title: 'Прокладка коммуникаций', status: 'in-progress', assignee: 'Дмитрий Сидоров', dueDate: '2024-04-25' },
    { id: 4, title: 'Монтаж лифтов', status: 'pending', assignee: 'Елена Козлова', dueDate: '2024-06-01' },
    { id: 5, title: 'Внутренняя отделка', status: 'pending', assignee: 'Игорь Морозов', dueDate: '2024-08-05' }
  ];

  const milestones: ObjectMilestone[] = [
    { date: '2023-06-15', title: 'Начало строительства', status: 'completed', description: 'Получение разрешений и начало земляных работ' },
    { date: '2023-08-15', title: 'Фундамент готов', status: 'completed', description: 'Заливка фундамента и гидроизоляция' },
    { date: '2024-03-20', title: 'Каркас здания', status: 'current', description: 'Возведение несущих конструкций' },
    { date: '2024-08-15', title: 'Коробка готова', status: 'upcoming', description: 'Завершение основных строительных работ' },
    { date: '2024-12-31', title: 'Сдача объекта', status: 'upcoming', description: 'Официальная сдача объекта в эксплуатацию' }
  ];

  // Локации объекта (оставляем как есть — демо)
  const objectLocations = [
    {
      id: 1,
      name: 'Строительная площадка',
      coordinates: [37.6173, 55.7558] as [number, number],
      type: 'site' as const,
      address: object.address // ✅ Используем адрес из объекта
    },
    {
      id: 2,
      name: 'Офис застройщика',
      coordinates: [37.6254, 55.7552] as [number, number],
      type: 'office' as const,
      address: 'Москва, ЦАО, ул. Тверская, 15'
    },
    {
      id: 3,
      name: 'Склад материалов',
      coordinates: [37.6085, 55.7522] as [number, number],
      type: 'site' as const,
      address: 'Москва, САО, ул. Арбат, 25'
    },
    {
      id: 4,
      name: 'Офис продаж',
      coordinates: [37.6421, 55.7736] as [number, number],
      type: 'client' as const,
      address: 'Москва, САО, ул. Ленинский проспект, 100'
    }
  ];

  // ✅ Удаляем getStatusColor — нет статуса
  // ✅ Удаляем getPriorityColor — нет приоритета
  // ✅ Удаляем formatPrice — нет бюджета

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'in-progress':
        return <SyncOutlined spin style={{ color: '#1890ff' }} />;
      case 'pending':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      default:
        return null;
    }
  };

  const getMemberStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge status="success" />;
      case 'away':
        return <Badge status="warning" />;
      case 'offline':
        return <Badge status="default" />;
      default:
        return <Badge status="default" />;
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5' }}>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/objects')}
          style={{ marginBottom: '16px' }}
        >
          Назад к объектам
        </Button>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>{object.name}</Title>
            {/* ✅ Убрали теги статуса и приоритета */}
            {/* ✅ Можно добавить тип, если он появится */}
          </div>
          <Space>
            <Button type="primary">Редактировать</Button>
            <Button>Настройки</Button>
          </Space>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {/* Основная информация */}
        <Col xs={24} lg={16}>
          <Card title="Описание объекта" style={{ marginBottom: '16px' }}>
            <Paragraph>{object.description}</Paragraph>
          </Card>

          {/* Прогресс — используем сгенерированный */}
          <Card title="Прогресс строительства" style={{ marginBottom: '16px' }}>
            <Progress 
              percent={progress} 
              status={progress === 100 ? 'success' : 'active'}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
            <Text type="secondary" style={{ marginTop: '8px', display: 'block' }}>
              {progress}% завершено
            </Text>
          </Card>

          {/* Задачи */}
          <Card title="Последние задачи" style={{ marginBottom: '16px' }}>
            <List
              dataSource={recentTasks}
              renderItem={(task) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={getTaskStatusIcon(task.status)}
                    title={task.title}
                    description={
                      <Space>
                        <Text type="secondary">Исполнитель: {task.assignee}</Text>
                        <Text type="secondary">•</Text>
                        <Text type="secondary">Срок: {new Date(task.dueDate).toLocaleDateString('ru-RU')}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Карта объекта */}
          <ObjectMap 
            geometry={object.coords}
            zoom={12}
          />
        </Col>

        {/* Боковая панель */}
        <Col xs={24} lg={8}>
          {/* ✅ Удаляем блок "Статистика объекта" — нет данных */}
          {/* Можно оставить только адрес */}
          <Card title="Местоположение" style={{ marginBottom: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text type="secondary">
                  <EnvironmentOutlined /> {object.address}
                </Text>
              </div>
            </Space>
          </Card>

          {/* Команда */}
          <Card title="Команда объекта">
            <List
              size="small"
              dataSource={workers}
              renderItem={(worker) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Tooltip title={worker.status}>
                        {getMemberStatusBadge(worker.status)}
                        <Avatar size="small" icon={<UserOutlined />} style={{ marginLeft: '8px' }} />
                      </Tooltip>
                    }
                    title={worker.name}
                    description={worker.role}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Временная шкала */}
      <Card title="Временная шкала строительства" style={{ marginTop: '16px' }}>
        <Timeline>
          {milestones.map((milestone, index) => (
            <Timeline.Item
              key={index}
              color={
                milestone.status === 'completed' ? 'green' :
                milestone.status === 'current' ? 'blue' : 'gray'
              }
              dot={
                milestone.status === 'completed' ? <CheckCircleOutlined /> :
                milestone.status === 'current' ? <SyncOutlined spin /> : null
              }
            >
              <div>
                <Text strong>{milestone.title}</Text>
                <br />
                <Text type="secondary">{milestone.description}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  <CalendarOutlined /> {new Date(milestone.date).toLocaleDateString('ru-RU')}
                </Text>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </div>
  );
};

export default ObjectDetail;