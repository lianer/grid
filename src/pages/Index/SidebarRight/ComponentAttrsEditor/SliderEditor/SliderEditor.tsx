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
        defaultValue={attr.value}
        min={attr.min}
        max={attr.max}
        step={attr.step}
        onAfterChange={(value: number) => {
          if (value !== attr.value) {
            update({
              ...attr,
              value,
            });
          }
        }}
      />
    </Form.Item>
  );
};

export default SliderEditor;
