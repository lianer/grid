import { BasicControlSchema, Category, DefineSchema } from '@/interface';
import { Attrs } from '@/schema/attrs';

type TextSchema = DefineSchema<
  BasicControlSchema,
  {
    text: Attrs.TextInput;
    fontSize: Attrs.NumberInput;
    fontWeight: Attrs.Selector;
    color: Attrs.ColorPicker;
    opacity: Attrs.Slider;
  }
>;

const schema: TextSchema = {
  base: {
    cid: 1,
    name: '文本',
    icon: 'https://lianer-design-hd1.oss-cn-hangzhou.aliyuncs.com/projects/grid/text.svg',
    category: Category.basic,
  },
  control: {
    type: 'BasicControlSchema',
    width: 100,
    height: 14,
    left: 0,
    top: 0,
  },
  props: {
    text: new Attrs.TextInput({}),
    fontSize: new Attrs.NumberInput({ val: 14 }),
    fontWeight: new Attrs.Selector({
      val: 'normal',
      options: ['normal', 'bold', 'italic'],
    }),
    color: new Attrs.ColorPicker({}),
    opacity: new Attrs.Slider({}),
  },
};

export { TextSchema };
export default schema;
