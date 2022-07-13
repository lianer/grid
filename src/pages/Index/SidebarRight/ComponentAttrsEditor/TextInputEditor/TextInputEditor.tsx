import AttrUtils from '@/lib/AttrUtils';
import { Form, Input } from 'antd';

const TextInputEditor: React.FC<{
  iid: number;
  attr: AttrUtils.TextInput;
  update: (attr: any) => void;
}> = function ({ iid, attr, update }) {
  return (
    <Form.Item label={attr.title}>
      {attr.rows > 1 && (
        <Input.TextArea
          value={attr.value}
          rows={attr.rows}
          maxLength={attr.maxLength}
          onChange={(e) => {
            update({ ...attr, value: e.target.value });
          }}
        />
      )}
      {attr.rows <= 1 && (
        <Input
          value={attr.value}
          maxLength={attr.maxLength}
          onChange={(e) => {
            update({ ...attr, value: e.target.value });
          }}
        />
      )}
    </Form.Item>
  );
};

export default TextInputEditor;
