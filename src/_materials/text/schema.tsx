import { AttrUtils } from '@/lib/AttrUtils';
import { BasicControlSchema, DefineSchema } from '@/types';

type TextSchema = DefineSchema<
  BasicControlSchema,
  {
    text: AttrUtils.TextInput;
    fontSize: AttrUtils.NumberInput;
    fontWeight: AttrUtils.Selector<'bold' | 'normal', string>;
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
      rows: 4,
      range: [0, 10000],
    }),
    fontSize: new AttrUtils.NumberInput({ title: '字号', value: 14 }),
    fontWeight: new AttrUtils.Selector({
      title: '字粗',
      selected: 'normal',
      options: [
        {
          label: '常规',
          value: 'normal',
        },
        {
          label: '粗体',
          value: 'bold',
        },
      ],
    }),
    color: new AttrUtils.ColorPicker({ value: '#333' }),
    opacity: new AttrUtils.Slider({}),
  },
};

export { TextSchema };
export default schema;
