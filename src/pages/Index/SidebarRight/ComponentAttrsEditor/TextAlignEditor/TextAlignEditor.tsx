import AttrUtils from '@/lib/AttrUtils';
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { Form, Space } from 'antd';
import IconButton from '../_components/IconButton/IconButton';

const alignHorizontalOptions: {
  label: string;
  value: AttrUtils.TextAlignHorizontal;
  icon: React.ReactNode;
}[] = [
  {
    label: '左对齐',
    value: 'left',
    icon: <AlignLeftOutlined />,
  },
  {
    label: '居中',
    value: 'center',
    icon: <AlignCenterOutlined />,
  },
  {
    label: '右对齐',
    value: 'right',
    icon: <AlignRightOutlined />,
  },
];

const alignVerticalOptions: {
  label: string;
  value: AttrUtils.TextAlignVertical;
  icon: React.ReactNode;
}[] = [
  {
    label: '上对齐',
    value: 'top',
    icon: <VerticalAlignTopOutlined />,
  },
  {
    label: '居中',
    value: 'middle',
    icon: <VerticalAlignMiddleOutlined />,
  },
  {
    label: '下对齐',
    value: 'bottom',
    icon: <VerticalAlignBottomOutlined />,
  },
];

const TextAlignEditor: React.FC<{
  iid: number;
  attr: AttrUtils.TextAlign;
  update: (attr: any) => void;
}> = function ({ iid, attr, update }) {
  return (
    <Form.Item className="TextAlign" label={attr.title}>
      <Space size="large">
        <Space className="bg-gray-100 rounded p-0.5">
          {alignHorizontalOptions.map((option) => (
            <IconButton
              active={option.value === attr.horizontal}
              onClick={() => {
                update({ ...attr, horizontal: option.value });
              }}
            >
              {option.icon}
            </IconButton>
          ))}
        </Space>

        <Space className="bg-gray-100 rounded p-0.5">
          {alignVerticalOptions.map((option) => (
            <IconButton
              active={option.value === attr.vertical}
              onClick={() => {
                update({ ...attr, vertical: option.value });
              }}
            >
              {option.icon}
            </IconButton>
          ))}
        </Space>
      </Space>
    </Form.Item>
  );
};

export default TextAlignEditor;
