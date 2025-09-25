import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Space} from 'antd';
import { HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { OBJECTS_MOCK } from '../mocks/objects';

const { Title, Text } = Typography;
const { Meta } = Card;

// ✅ Обновлённый интерфейс под реальные данные
interface RealEstateObject {
  id: number;
  name: string;
  description: string;
  address: string;        // вместо location
  photo: string;          // URL изображения
}

export const Objects: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Данные — добавим id для key
  const [objects] = useState<RealEstateObject[]>(OBJECTS_MOCK);

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
                ,
              ]}
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
                      </Space>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};