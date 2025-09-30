import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Tag,
  Modal,
  message,
} from 'antd';
import { HomeOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { OBJECTS_MOCK } from '../mocks/objects';

const { Title, Text } = Typography;
const { Meta } = Card;

type ObjectStatus = 'new' | 'in_progress';

const STATUS_LABELS: Record<ObjectStatus, string> = {
  new: 'Новый',
  in_progress: 'В работе',
};

const STATUS_COLORS: Record<ObjectStatus, string> = {
  new: 'blue',
  in_progress: 'green',
};

// Хардкод: подрядчик
const CONTRACTOR_NAME = 'ООО «СтройГарант»';

interface RealEstateObject {
  id: number;
  name: string;
  description: string;
  address: string;
  photo: string;
  responsible: string;
  status: ObjectStatus;
  plannedStartDate: string;      // "2024-01-15"
  actualStartDate: string | null; // "2024-02-01" или null
}

export const Objects: React.FC = () => {
  const navigate = useNavigate();
  const [objects, setObjects] = useState<RealEstateObject[]>(OBJECTS_MOCK);

  // Состояние модального окна подтверждения
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null);

  // Открыть модалку
  const handleOpenConfirmModal = (id: number) => {
    setSelectedObjectId(id);
    setIsConfirmModalOpen(true);
  };

  // Подтвердить перевод в работу
  const handleConfirmMoveToWork = () => {
    if (selectedObjectId === null) return;

    // Обновляем статус объекта
    setObjects(prev =>
      prev.map(obj =>
        obj.id === selectedObjectId ? { ...obj, status: 'in_progress' } : obj
      )
    );

    message.success('Объект успешно переведён в работу!');
    setIsConfirmModalOpen(false);
    setSelectedObjectId(null);
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ margin: 0 }}>Объекты недвижимости</Title>
        <Button type="primary" icon={<HomeOutlined />}>
          Добавить объект
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {objects.map((object) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={object.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={object.name}
                  src={object.photo}
                  style={{ height: 180, objectFit: 'cover' }}
                />
              }
              actions={[
                <Button
                  type="link"
                  key="view"
                  onClick={() => navigate(`/objects/${object.id}`)}
                >
                  Подробнее
                </Button>,
                object.status === 'new' ? (
                  <Button
                    type="default"
                    key="moveToWork"
                    onClick={() => handleOpenConfirmModal(object.id)}
                  >
                    Перевести в работу
                  </Button>
                ) : null,
              ].filter(Boolean)}
              style={{ height: '100%' }}
            >
              <Meta
                title={object.name}
                description={
                  <div>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      {object.description}
                    </Text>
                    <div style={{ marginTop: '12px' }}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <EnvironmentOutlined style={{ color: '#1890ff' }} />
                          <Text type="secondary" style={{ fontSize: '13px' }}>
                            {object.address}
                          </Text>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <UserOutlined style={{ color: '#52c41a' }} />
                          <Text style={{ fontSize: '13px' }}>
                            Отв.: {object.responsible}
                          </Text>
                        </div>

                        <div>
                          <Text type="secondary" style={{ fontSize: '13px', marginRight: 6 }}>
                            Статус:
                          </Text>
                          <Tag color={STATUS_COLORS[object.status]}>
                            {STATUS_LABELS[object.status]}
                          </Tag>
                        </div>
                      </Space>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Модальное окно подтверждения */}
      <Modal
        title="Перевод объекта в работу"
        open={isConfirmModalOpen}
        onCancel={() => {
          setIsConfirmModalOpen(false);
          setSelectedObjectId(null);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsConfirmModalOpen(false);
              setSelectedObjectId(null);
            }}
          >
            Отмена
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleConfirmMoveToWork}
          >
            Перевести в работу
          </Button>,
        ]}
      >
        <p>
          Объект будет передан подрядчику для выполнения работ.
        </p>
        <p>
          <strong>Подрядчик:</strong> {CONTRACTOR_NAME}
        </p>
        <p style={{ color: '#faad14', fontSize: '13px' }}>
          После подтверждения статус изменится на «В работе».
        </p>
      </Modal>
    </div>
  );
};