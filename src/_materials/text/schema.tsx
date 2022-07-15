import { AttrUtils } from '@/lib/AttrUtils';
import { BasicControlSchema, DefineSchema } from '@/types';

type TextSchema = DefineSchema<
  BasicControlSchema,
  {
    text: AttrUtils.TextInput;
    font: AttrUtils.Font;
    color: AttrUtils.ColorPicker;
    opacity: AttrUtils.Slider;
  }
>;

const schema: TextSchema = {
  base: {
    cid: 1,
    name: '文本',
    icon: 'https://lianer-design-hd1.oss-cn-hangzhou.aliyuncs.com/projects/grid/text.svg',
    category: 'basic',
  },

  control: {
    type: 'BasicControlSchema',
    width: 200,
    height: 64,
    left: 0,
    top: 0,
  },

  attrs: {
    text: new AttrUtils.TextInput({
      value: '文本',
      rows: 8,
      maxLength: 10000,
    }),
    font: new AttrUtils.Font({}),
    color: new AttrUtils.ColorPicker({ value: '#333' }),
    opacity: new AttrUtils.Slider({ title: '透明' }),
  },
};

export { TextSchema };
export default schema;
