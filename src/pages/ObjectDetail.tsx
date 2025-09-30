import React, { useState, useMemo } from 'react';
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
  Tag,
  Table,
  Checkbox,
  Image
} from 'antd';
import { 
  ArrowLeftOutlined, 
  UserOutlined, 
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { ObjectMap } from '../components/ObjectMap';
import { OBJECTS_MOCK } from '../mocks/objects';

const { Title, Text, Paragraph } = Typography;

type ObjectStatus = 'new' | 'in_progress';

const STATUS_LABELS: Record<ObjectStatus, string> = {
  new: 'Новый',
  in_progress: 'В работе',
};

const STATUS_COLORS: Record<ObjectStatus, string> = {
  new: 'blue',
  in_progress: 'green',
};

// Форматирование даты
const formatDate = (dateString: string | null): string => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('ru-RU');
};

const formatCoordinates = (coords: [number, number]): string => {
  const [lng, lat] = coords;
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};

// Получение первой координаты внешнего кольца полигона
const getFirstCoordinate = (geometry: any): string | null => {
  if (!geometry || geometry.type !== 'Polygon' || !geometry.coordinates?.[0]?.[0]) {
    return null;
  }
  const firstPoint = geometry.coordinates[0][0]; // [lng, lat]
  return formatCoordinates(firstPoint as [number, number]);
};

interface ObjectTask {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  assignee: string;
  dueDate: string;
}

// interface RealEstateObject {
//   id: number;
//   name: string;
//   description: string;
//   address: string;
//   photo: string;
//   responsible: string;
//   status: ObjectStatus;
//   plannedStartDate: string;
//   actualStartDate: string | null;
//   coords?: [number, number]; // опционально для карты
// }

export const ObjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const object = OBJECTS_MOCK.find((obj) => obj.id === Number(id)) || OBJECTS_MOCK[0];

  const [resolvedRemarks, setResolvedRemarks] = useState<Set<number>>(new Set());

  const [resolvedViolations, setResolvedViolations] = useState<Set<number>>(new Set());


    // Подготовка данных: добавляем флаг isResolved
    const remarksWithStatus = useMemo(() => {
      const source = object.remarks || [];
      return source.map(remark => ({
        ...remark,
        isResolved: resolvedRemarks.has(remark.id),
      }));
    }, [object.remarks, resolvedRemarks]);

    const violationsWithStatus = useMemo(() => {
      const source = object.violations || [];
      return source.map(violation => ({
        ...violation,
        isResolved: resolvedViolations.has(violation.id),
      }));
    }, [object.violations, resolvedViolations]);
  
    const handleToggleResolved = (id: number, checked: boolean) => {
      setResolvedRemarks(prev => {
        const newSet = new Set(prev);
        if (checked) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
        return newSet;
      });
    };

    const handleToggleViolationResolved = (id: number, checked: boolean) => {
      setResolvedViolations(prev => {
        const newSet = new Set(prev);
        if (checked) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
        return newSet;
      });
    };

    const violationsColumns = [
      {
        title: 'Нарушение',
        dataIndex: 'title',
        key: 'title',
        render: (text: string, record: { isResolved: boolean }) => (
          <Text delete={record.isResolved} type={record.isResolved ? 'secondary' : undefined}>
            {text}
          </Text>
        ),
      },
      {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        render: (date: string) => formatDate(date),
        width: 110,
      },
      {
        title: 'Автор',
        dataIndex: 'author',
        key: 'author',
        width: 140,
      },
      {
        title: 'Статус',
        key: 'status',
        width: 100,
        render: (_: any, record: { id: number; isResolved: boolean }) => (
          <Checkbox
            checked={record.isResolved}
            onChange={e => handleToggleViolationResolved(record.id, e.target.checked)}
          >
            Устранено
          </Checkbox>
        ),
      },
    ];
  
    const remarksColumns = [
      {
        title: 'Замечание',
        dataIndex: 'title',
        key: 'title',
        render: (text: string, record: { isResolved: boolean }) => (
          <Text delete={record.isResolved} type={record.isResolved ? 'secondary' : undefined}>
            {text}
          </Text>
        ),
      },
      {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        render: (date: string) => formatDate(date),
        width: 110,
      },
      {
        title: 'Автор',
        dataIndex: 'author',
        key: 'author',
        width: 140,
      },
      {
        title: 'Статус',
        key: 'status',
        width: 100,
        render: (_: any, record: { id: number; isResolved: boolean }) => (
          <Checkbox
            checked={record.isResolved}
            onChange={e => handleToggleResolved(record.id, e.target.checked)}
          >
            Исправлено
          </Checkbox>
        ),
      },
    ];


  const firstCoord = getFirstCoordinate(object.coords);


  const progress = Math.floor(Math.random() * 100);

  const recentTasks: ObjectTask[] = [
    { id: 1, title: 'Заливка фундамента', status: 'completed', assignee: 'Александр Иванов', dueDate: '2023-08-15' },
    { id: 2, title: 'Возведение каркаса', status: 'in-progress', assignee: 'Мария Петрова', dueDate: '2024-03-20' },
    { id: 3, title: 'Прокладка коммуникаций', status: 'in-progress', assignee: 'Дмитрий Сидоров', dueDate: '2024-04-25' },
    { id: 4, title: 'Монтаж лифтов', status: 'pending', assignee: 'Елена Козлова', dueDate: '2024-06-01' },
    { id: 5, title: 'Внутренняя отделка', status: 'pending', assignee: 'Игорь Морозов', dueDate: '2024-08-05' }
  ];

    // Гарантируем, что stages — массив (если null → пустой массив)
    const stagesData = object.stages || [];

    const columns = [
      {
        title: 'Этап работ',
        dataIndex: 'stage',
        key: 'stage',
        render: (text: string) => <Text>{text}</Text>,
      },
      {
        title: 'Начало',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (date: string) => formatDate(date),
        width: 120,
      },
      {
        title: 'Окончание',
        dataIndex: 'endDate',
        key: 'endDate',
        render: (date: string) => formatDate(date),
        width: 120,
      },
    ];

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
            {/* ✅ Вывод статуса под заголовком */}
            <div style={{ marginTop: '8px' }}>
              <Tag color={STATUS_COLORS[object.status]}>
                {STATUS_LABELS[object.status]}
              </Tag>
            </div>
          </div>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {/* Основная информация */}
        <Col xs={24} lg={16}>
          <Card title="Описание объекта" style={{ marginBottom: '16px' }}>
            <Paragraph>{object.description}</Paragraph>
          </Card>

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

          <ObjectMap 
            geometry={object.coords}
            zoom={12}
          />

             {/* ✅ ТАБЛИЦА ЗАМЕЧАНИЙ */}
             <Card title="Замечания" style={{ marginTop: '16px' }}>
            {remarksWithStatus.length > 0 ? (
              <Table
                dataSource={remarksWithStatus}
                columns={remarksColumns}
                pagination={false}
                rowKey="id"
                size="small"
              />
            ) : (
              <Text type="secondary">
                Нет замечаний
              </Text>
            )}
          </Card>

          <Card title="Нарушения" style={{ marginTop: '16px' }}>
            {violationsWithStatus.length > 0 ? (
              <Table
                dataSource={violationsWithStatus}
                columns={violationsColumns}
                pagination={false}
                rowKey="id"
                size="small"
              />
            ) : (
              <Text type="secondary">Нет нарушений</Text>
            )}
          </Card>
        </Col>

        {/* Боковая панель */}
        <Col xs={24} lg={8}>
           {/* ✅ ФОТОГРАФИЯ ОБЪЕКТА */}
           {object.photo && (
            <Card style={{ marginBottom: '16px' }}>
              <Image
                src={object.photo}
                alt={object.name}
                style={{ width: '100%', borderRadius: 4 }}
                preview={{ // включаем превью при клике
                  mask: 'Увеличить',
                }}
              />
            </Card>
          )}
          {/* Местоположение */}
          <Card title="Местоположение" style={{ marginBottom: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text type="secondary">
                <EnvironmentOutlined /> {object.address}
              </Text>
            </Space>
          </Card>

          {/* ✅ НОВЫЙ БЛОК: Даты начала работ */}
          <Card title="Даты начала работ" style={{ marginBottom: '16px' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text type="secondary">Плановая дата:</Text>
                <br />
                <Text strong>{formatDate(object.plannedStartDate)}</Text>
              </div>
              <div>
                <Text type="secondary">Фактическая дата:</Text>
                <br />
                <Text strong>{formatDate(object.actualStartDate)}</Text>
              </div>
            </Space>
          </Card>

          {firstCoord && (
            <Card title="Координаты (центр/начало)" style={{ marginBottom: '16px' }}>
              <Text copyable>
                {firstCoord}
              </Text>
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                Широта, Долгота
              </Text>
            </Card>
          )}

        <Card title="Состав работ" style={{ marginTop: '16px' }}>
            {stagesData.length > 0 ? (
              <Table
                dataSource={stagesData}
                columns={columns}
                pagination={false}
                rowKey="id"
                size="small"
              />
            ) : (
              <Text type="secondary">Нет данных о составе работ</Text>
            )}
          </Card>

          {/* Ответственный */}
          <Card title="Ответственный" style={{ marginBottom: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar icon={<UserOutlined />} />
                <Text>{object.responsible}</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

    </div>
  );
};
