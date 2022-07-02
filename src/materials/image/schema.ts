import {
  BaseSchema,
  Category,
  Control,
  MergeSchema,
  StandardOperatorSchema,
} from '@/interface';
import Attrs from '@/schema/attrs';

type ImageSchema = MergeSchema<
  BaseSchema,
  StandardOperatorSchema,
  {
    src: Attrs.TextInput;
    opacity: Attrs.Slider;
  }
>;

const schema: ImageSchema = {
  $cid: 2,
  $name: '图片',
  $icon:
    'https://lianer-design-hd1.oss-cn-hangzhou.aliyuncs.com/projects/grid/image.svg',
  $category: Category.basic,
  $control: Control.basic,
  $width: 200,
  $height: 80,
  $left: 0,
  $top: 0,
  src: new Attrs.TextInput({ val: '' }),
  opacity: new Attrs.Slider({}),
};

export { ImageSchema };
export default schema;
