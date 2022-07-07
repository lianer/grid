import AttrUtils from '@/lib/AttrUtils';
import { Form, Input } from 'antd';

const TextInputEditor: React.FC<{
  attr: AttrUtils.TextInput;
  update: (attr: any) => void;
}> = function ({ attr, update }) {
  return (
    <Form.Item label={attr.title}>
      <Input.TextArea
        value={attr.value}
        rows={attr.rows}
        maxLength={attr.range[1]}
        onChange={(e) => {
          update({ ...attr, value: e.target.value });
        }}
      />
    </Form.Item>
  );
};

export default TextInputEditor;
