import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Typography, 
  Tag, 
  Space, 
  Input, 
  Tooltip
} from 'antd';
import { 
  SearchOutlined, 
  WarningOutlined,
  StopOutlined,
  FileTextOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

// ✅ Обновлённый интерфейс под реальные данные
interface Violation {
  id: number;
  category: string;
  kind: 'Устранимое' | 'Неустранимое'; // Kind: устранимость
  type: 'Грубое' | 'Простое';           // Type: степень нарушения
  description: string;
  fixTime: number | null;               // Срок устранения в днях (null = неустранимо)
}

export const Violations: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  // ✅ Данные (добавим id для key)
  const violations: Violation[] = [
    { id: 1, category: "Культура производства", kind: "Устранимое", type: "Грубое", description: "Несвоевременный вывоз строительного мусора, более суток", fixTime: 1 },
    { id: 2, category: "Культура производства", kind: "Устранимое", type: "Грубое", description: "Нарушение места складирования строительного мусора", fixTime: 1 },
    { id: 3, category: "Документация", kind: "Устранимое", type: "Грубое", description: "Отсутствует информационный щит", fixTime: 1 },
    { id: 4, category: "Документация", kind: "Устранимое", type: "Грубое", description: "Не корректная (не полная) информация на информационном щите", fixTime: 1 },
    { id: 5, category: "Технология производства", kind: "Устранимое", type: "Грубое", description: "Установка поврежденного бортового камня", fixTime: 5 },
    { id: 6, category: "Технология производства", kind: "Неустранимое", type: "Грубое", description: "Укладка асфальтобетонной смеси при неблагоприятных погодных условиях", fixTime: null },
    { id: 7, category: "Технология укладки АБП", kind: "Неустранимое", type: "Грубое", description: "Укладка асфальтобетонной смеси без разборки старого покрытия", fixTime: null },
    { id: 8, category: "Технология укладки АБП", kind: "Устранимое", type: "Грубое", description: "Устройство слоёв оснований из материалов, не предусмотренных проектом", fixTime: 5 },
    { id: 9, category: "Проектные решения", kind: "Устранимое", type: "Простое", description: "Нарушение зоны безопасности МАФ (наличие твердых покрытий, ОЛХ, бортовых камней, приствольных металлических решеток, МАФ, пересечение зон безопасности, зеленых насаждений)", fixTime: 5 },
    { id: 10, category: "Проектные решения", kind: "Устранимое", type: "Простое", description: "Нарушение проектной высоты от поверхности площадки до элементов МАФ", fixTime: 5 },
    { id: 11, category: "Культура производства", kind: "Устранимое", type: "Грубое", description: "Несвоевременный вывоз строительного мусора, более суток", fixTime: 1 },
    { id: 12, category: "Культура производства", kind: "Устранимое", type: "Грубое", description: "Складирование строительного мусора на газоне", fixTime: 1 },
    { id: 13, category: "Завершенные работы", kind: "Неустранимое", type: "Грубое", description: "Нарушение продольных, поперечных уклонов пешеходных дорожек, тротуаров требованиям нормативов для маломобильных граждан", fixTime: null },
    { id: 14, category: "Завершенные работы", kind: "Неустранимое", type: "Грубое", description: "Нарушение ровности покрытия, необеспечение водоотвода, наличие мест застоя воды", fixTime: null },
  ];

  // ✅ Фильтрация
  const filteredViolations = violations.filter(violation =>
    violation.category.toLowerCase().includes(searchText.toLowerCase()) ||
    violation.description.toLowerCase().includes(searchText.toLowerCase()) ||
    violation.kind.toLowerCase().includes(searchText.toLowerCase()) ||
    violation.type.toLowerCase().includes(searchText.toLowerCase())
  );

  // ✅ Цвета для категории
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Культура производства': 'blue',
      'Документация': 'purple',
      'Технология производства': 'red',
      'Технология укладки АБП': 'volcano',
      'Проектные решения': 'geekblue',
      'Завершенные работы': 'green',
    };
    return colors[category] || 'default';
  };

  // ✅ Иконка и цвет для типа нарушения (Грубое / Простое)
  const getTypeIcon = (type: string) => {
    if (type === 'Грубое') {
      return <StopOutlined style={{ color: '#ff4d4f' }} />;
    }
    return <WarningOutlined style={{ color: '#faad14' }} />;
  };

  const getTypeTag = (type: string) => {
    return (
      <Tag color={type === 'Грубое' ? 'error' : 'warning'}>
        {type}
      </Tag>
    );
  };

  // ✅ Цвет для вида (Устранимое / Неустранимое)
  const getKindTag = (kind: string) => {
    return (
      <Tag color={kind === 'Устранимое' ? 'success' : 'error'}>
        {kind}
      </Tag>
    );
  };

  // ✅ Колонки таблицы
  const columns = [
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color={getCategoryColor(category)}>
          {category}
        </Tag>
      ),
      filters: Array.from(new Set(violations.map(v => v.category))).map(cat => ({
        text: cat,
        value: cat,
      })),
      onFilter: (value: any, record: Violation) => record.category === value,
      width: 200,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <Tooltip title={text}>
          <Text ellipsis style={{ maxWidth: 400, display: 'inline-block' }}>
            {text}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Space>
          {getTypeIcon(type)}
          {getTypeTag(type)}
        </Space>
      ),
      filters: [
        { text: 'Грубое', value: 'Грубое' },
        { text: 'Простое', value: 'Простое' },
      ],
      onFilter: (value: any, record: Violation) => record.type === value,
      width: 120,
    },
    {
      title: 'Вид',
      dataIndex: 'kind',
      key: 'kind',
      render: (kind: string) => getKindTag(kind),
      filters: [
        { text: 'Устранимое', value: 'Устранимое' },
        { text: 'Неустранимое', value: 'Неустранимое' },
      ],
      onFilter: (value: any, record: Violation) => record.kind === value,
      width: 130,
    },
    {
      title: 'Срок устранения',
      dataIndex: 'fixTime',
      key: 'fixTime',
      render: (fixTime: number | null) => (
        fixTime !== null ? (
          <Space>
            <ClockCircleOutlined style={{ color: '#1890ff' }} />
            <Text>{fixTime} дн.</Text>
          </Space>
        ) : (
          <Tag color="red">Неустранимо</Tag>
        )
      ),
      width: 150,
    },
  ];

  // ✅ Expanded row — показ полного описания
  const expandedRowRender = (record: Violation) => (
    <div style={{ margin: '12px 0', padding: '12px', background: '#fafafa', borderRadius: 4 }}>
      <Text strong>Полное описание:</Text>
      <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
        {record.description}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '24px', background: '#f5f5f5' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, marginBottom: '16px' }}>
          Классификатор нарушений
        </Title>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Search
            placeholder="Поиск по категории, описанию, типу или виду нарушения..."
            allowClear
            style={{ width: 400 }}
            size="large"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          
        </div>

        <div style={{ marginBottom: '16px', color: '#666' }}>
          Всего нарушений: <strong>{violations.length}</strong> | 
          Найдено: <strong>{filteredViolations.length}</strong>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredViolations}
          rowKey="id"
          expandable={{
            expandedRowRender,
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <FileTextOutlined onClick={e => onExpand(record, e)} style={{ color: '#1890ff' }} />
              ) : (
                <FileTextOutlined onClick={e => onExpand(record, e)} />
              ),
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} из ${total} записей`,
          }}
          scroll={{ x: 1000 }}
          size="middle"
          bordered
        />
      </Card>
    </div>
  );
};