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
  Form,
  Upload,
  Input,
} from 'antd';
import { HomeOutlined, EnvironmentOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
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

// Тип для данных формы (файлы хранятся отдельно)
interface AddObjectFormValues {
  name: string;
  address: string;
  description: string;
}

export const Objects: React.FC = () => {
  const navigate = useNavigate();
  const [objects, setObjects] = useState<RealEstateObject[]>(OBJECTS_MOCK);

  // Состояние модального окна подтверждения
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [coordsFile, setCoordsFile] = useState<File | null>(null);
  const [form] = Form.useForm<AddObjectFormValues>();

  const handleAdd = async (values: AddObjectFormValues) => {
    // Здесь можно отправить данные на сервер
    console.log('Форма отправлена:', values);
    console.log('Фото:', photoFile);
    console.log('Координаты:', coordsFile);

    // Пример: прочитать координаты из JSON-файла
    if (coordsFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const coords = JSON.parse(e.target?.result as string);
          console.log('Координаты из файла:', coords);
          // Можно сохранить coords.lat, coords.lng и т.д.
        } catch (err) {
          message.error('Неверный формат файла координат. Ожидается JSON.');
          return;
        }
      };
      reader.readAsText(coordsFile);
    }

    message.success('Объект успешно добавлен!');
    setIsModalOpen(false);
    form.resetFields();
    setPhotoFile(null);
    setCoordsFile(null);
  };

  const handlePhotoChange = (info: any) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj as File;
      setPhotoFile(file);
    } else {
      setPhotoFile(null);
    }
  };

  const handleCoordsChange = (info: any) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj as File;
      // Проверка расширения (опционально)
      if (!file.name.endsWith('.json')) {
        message.warning('Рекомендуется использовать JSON-файл с координатами.');
      }
      setCoordsFile(file);
    } else {
      setCoordsFile(null);
    }
  };

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
        <Button type="primary" icon={<HomeOutlined />} onClick={() => setIsModalOpen(true)}>
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
            {/* Модальное окно добавления */}
            <Modal
        title="Добавить объект недвижимости"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setPhotoFile(null);
          setCoordsFile(null);
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAdd}
          initialValues={{ description: '' }}
        >
          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, message: 'Введите название объекта' }]}
          >
            <Input placeholder="Например: ЖК «Солнечный»" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Адрес"
            rules={[{ required: true, message: 'Введите адрес' }]}
          >
            <Input placeholder="Улица, дом, город" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: 'Введите описание' }]}
          >
            <Input.TextArea rows={3} placeholder="Краткое описание объекта" />
          </Form.Item>

          <Form.Item
            label="Фото объекта"
            required
            tooltip="Поддерживаются JPG, PNG"
          >
            <Upload
              beforeUpload={() => false} // Отключаем автоматическую загрузку
              onChange={handlePhotoChange}
              fileList={photoFile ? [{ uid: '-1', name: photoFile.name, status: 'done' }] : []}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Загрузить фото</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Координаты (файл)"
            tooltip="Файл в формате JSON"
          >
            <Upload
              beforeUpload={() => false}
              onChange={handleCoordsChange}
              fileList={coordsFile ? [{ uid: '-2', name: coordsFile.name, status: 'done' }] : []}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Загрузить координаты (.json)</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  form.resetFields();
                  setPhotoFile(null);
                  setCoordsFile(null);
                }}
              >
                Отмена
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};