import { AttrUtils } from '@/lib/AttrUtils';
import { BasicControlSchema, DefineSchema } from '@/types';

type Schema = DefineSchema<
  BasicControlSchema,
  {
    images: AttrUtils.TextInput;
    opacity: AttrUtils.Slider;
  }
>;

const schema: Schema = {
  base: {
    cid: 3,
    name: '走马灯',
    icon: 'https://lianer-design-hd1.oss-cn-hangzhou.aliyuncs.com/projects/grid/carousel.svg?1',
    category: 'basic',
  },

  control: {
    type: 'BasicControlSchema',
    width: 400,
    left: 0,
    top: 0,
  },

  attrs: {
    images: new AttrUtils.TextInput({
      value:
        'https://kano.guahao.com/rs1687956125,https://kano.guahao.com/LSi687820266,https://kano.guahao.com/soE687561865,https://kano.guahao.com/1QE687641013',
      rows: 10,
    }),
    opacity: new AttrUtils.Slider({}),
  },
};

export { Schema };
export default schema;
