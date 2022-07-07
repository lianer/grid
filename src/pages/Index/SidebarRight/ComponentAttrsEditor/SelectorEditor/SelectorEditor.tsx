import AttrUtils from '@/lib/AttrUtils';
import { Form, Select } from 'antd';

const { Option } = Select;

const SelectorEditor: React.FC<{
  attr: AttrUtils.Selector<any, any>;
  update: (attr: any) => void;
}> = function ({ attr, update }) {
  return (
    <Form.Item label={attr.title}>
      <Select
        value={attr.selected}
        onChange={(value: string | number) =>
          update({ ...attr, selected: value })
        }
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
