import { AttrUtils } from '@/lib/AttrUtils';
import { BasicControlSchema, DefineSchema } from '@/types';

type TextSchema = DefineSchema<
  BasicControlSchema,
  {
    text: AttrUtils.TextInput;
    fontSize: AttrUtils.NumberInput;
    fontWeight: AttrUtils.Selector;
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
    text: new AttrUtils.TextInput({ val: '文本' }),
    fontSize: new AttrUtils.NumberInput({ val: 14 }),
    fontWeight: new AttrUtils.Selector({
      val: 'normal',
      options: ['normal', 'bold', 'italic'],
    }),
    color: new AttrUtils.ColorPicker({ val: '#333' }),
    opacity: new AttrUtils.Slider({}),
  },
};

export { TextSchema };
export default schema;
