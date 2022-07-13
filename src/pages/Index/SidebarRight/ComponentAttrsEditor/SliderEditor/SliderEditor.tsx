import AttrUtils from '@/lib/AttrUtils';
import { Form, Slider } from 'antd';

const SliderEditor: React.FC<{
  iid: number;
  attr: AttrUtils.Slider;
  update: (attr: any) => void;
}> = function ({ iid, attr, update }) {
  return (
    <Form.Item label={attr.title}>
      <Slider
        value={attr.value}
        min={attr.min}
        max={attr.max}
        step={attr.step}
        onChange={(value: number) => {
          update({
            ...attr,
            value,
          });
        }}
      />
    </Form.Item>
  );
};

export default SliderEditor;
