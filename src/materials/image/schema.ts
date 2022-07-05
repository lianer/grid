import Attrs from '@/lib/AttrUtils';
import { BasicControlSchema, DefineSchema } from '@/types';

type ImageSchema = DefineSchema<
  BasicControlSchema,
  {
    src: Attrs.TextInput;
    opacity: Attrs.Slider;
  }
>;

const schema: ImageSchema = {
  base: {
    cid: 2,
    name: '图片',
    icon: 'https://lianer-design-hd1.oss-cn-hangzhou.aliyuncs.com/projects/grid/image.svg',
    category: 'basic',
  },
  control: {
    type: 'BasicControlSchema',
    width: 400,
    left: 0,
    top: 0,
  },

  attrs: {
    src: new Attrs.TextInput({ val: '' }),
    opacity: new Attrs.Slider({}),
  },
};

export { ImageSchema };
export default schema;
