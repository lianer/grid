import {
  BaseSchema,
  Category,
  Control,
  MergeSchema,
  StandardOperatorSchema,
} from '@/interface';
import { Attrs } from '@/schema/attrs';

type TextSchema = MergeSchema<
  BaseSchema,
  StandardOperatorSchema,
  {
    text: Attrs.TextInput;
    fontSize: Attrs.NumberInput;
    fontWeight: Attrs.Selector;
    color: Attrs.ColorPicker;
    opacity: Attrs.Slider;
  }
>;

const schema: TextSchema = {
  $cid: 1,
  $name: '文本',
  $icon:
    'https://lianer-design-hd1.oss-cn-hangzhou.aliyuncs.com/projects/grid/text.svg',
  $category: Category.basic,
  $control: Control.basic,
  $width: 100,
  $height: 14,
  $left: 0,
  $top: 0,
  text: new Attrs.TextInput({}),
  fontSize: new Attrs.NumberInput({ val: 14 }),
  fontWeight: new Attrs.Selector({
    val: 'normal',
    options: ['normal', 'bold', 'italic'],
  }),
  color: new Attrs.ColorPicker({}),
  opacity: new Attrs.Slider({}),
};

export { TextSchema };
export default schema;
