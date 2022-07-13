import AttrUtils from '@/lib/AttrUtils';
import { Form, Select } from 'antd';

const { Option } = Select;

const SelectorEditor: React.FC<{
  iid: number;
  attr: AttrUtils.Selector<any, any>;
  update: (attr: any) => void;
}> = function ({ iid, attr, update }) {
  return (
    <Form.Item label={attr.title}>
      <Select
        value={attr.value}
        onChange={(value: string | number) => update({ ...attr, value })}
      >
        {attr.options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectorEditor;
