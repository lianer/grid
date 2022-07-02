import {
  BaseSchema,
  Category,
  Control,
  MergeSchema,
  StandardOperatorSchema,
} from '@/interface';
import { Attrs } from '@/schema/attrs';
import { FC } from 'react';

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

const Component: FC<TextSchema> = ({
  text,
  fontSize,
  fontWeight,
  color,
  opacity,
}) => {
  return (
    <div>
      <p>text.val: {text.val}</p>
      <p>fontSize.val: {fontSize.val}</p>
      <p>fontWeight.val: {fontWeight.val}</p>
      <p>color.val: {color.val}</p>
      <p>opacity.val: {opacity.val}</p>
    </div>
  );
};

const schema: TextSchema = {
  $id: 1,
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

export { schema, Component };
