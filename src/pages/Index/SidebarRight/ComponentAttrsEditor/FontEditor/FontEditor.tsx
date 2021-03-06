import AttrUtils from '@/lib/AttrUtils';
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
} from '@ant-design/icons';
import { Col, Form, Row, Select, Space } from 'antd';
import IconButton from '../_components/IconButton/IconButton';

const { Option } = Select;

// 除 sans-serif 外的字体与 fonts.less 文件的定义是对应的
const fontFamilyOptions = [
  {
    label: '默认字体',
    value: 'sans-serif',
  },
  {
    label: '思源黑体 Light',
    value: 'SourceHanSansCN-Light',
  },
  {
    label: '思源黑体 Regular',
    value: 'SourceHanSansCN-Regular',
  },

  {
    label: '思源宋体 Light',
    value: 'SourceHanSerifCN-Light',
  },
  {
    label: '思源宋体 Regular',
    value: 'SourceHanSerifCN-Regular',
  },
  {
    label: '江城圆体 200',
    value: 'jcyt-200',
  },
  {
    label: '江城圆体 400',
    value: 'jcyt-400',
  },
  {
    label: '站酷快乐体',
    value: 'zkklt',
  },
];

const fontSizeOptions = [
  12, 13, 14, 15, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96, 112,
  128,
];

const FontEditor: React.FC<{
  iid: number;
  attr: AttrUtils.Font;
  update: (attr: any) => void;
}> = function ({ iid, attr, update }) {
  const fontStyleButtons = [
    {
      value: 'bold',
      icon: <BoldOutlined />,
    },
    {
      value: 'italic',
      icon: <ItalicOutlined />,
    },
    {
      value: 'underline',
      icon: <UnderlineOutlined />,
    },
    {
      value: 'through',
      icon: <StrikethroughOutlined />,
    },
  ] as const;

  return (
    <Form.Item className="FontEditor" label={attr.title}>
      <Space className="w-full" direction="vertical">
        <Row gutter={8}>
          <Col span={12}>
            <Select
              value={attr.typeface}
              onChange={(value: string) => update({ ...attr, typeface: value })}
            >
              {fontFamilyOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <Select
              value={String(attr.size)}
              showArrow={false}
              onChange={(value: string) => update({ ...attr, size: +value })}
            >
              {fontSizeOptions.map((size) => (
                <Option key={size} value={String(size)}>
                  {size}px
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Space className="bg-gray-100 rounded p-0.5">
          {fontStyleButtons.map((button) => (
            <IconButton
              key={button.value}
              active={attr[button.value]}
              onClick={() => {
                update({ ...attr, [button.value]: !attr[button.value] });
              }}
            >
              {button.icon}
            </IconButton>
          ))}
        </Space>
      </Space>
    </Form.Item>
  );
};

export default FontEditor;
