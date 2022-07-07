import AttrUtils from '@/lib/AttrUtils';
import { Form, InputNumber } from 'antd';

const NumberInputEditor: React.FC<{
  attr: AttrUtils.NumberInput;
  update: (attr: any) => void;
}> = function ({ attr, update }) {
  return (
    <Form.Item label={attr.title}>
      <InputNumber
        value={attr.value}
        min={attr.range[0]}
        max={attr.range[1]}
        onChange={(value: number) => {
          console.log(value);
          update({ ...attr, value: value });
        }}
      />
    </Form.Item>
  );
};

export default NumberInputEditor;