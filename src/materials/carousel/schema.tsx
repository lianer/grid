import { AttrUtils } from '@/lib/AttrUtils';
import { AutoHeightControlSchema, DefineSchema } from '@/types';

type Schema = DefineSchema<
  AutoHeightControlSchema,
  {
    images: AttrUtils.TextInputList;
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
    type: 'AutoHeightControlSchema',
    width: 800,
    left: 0,
    top: 0,
  },

  attrs: {
    images: new AttrUtils.TextInputList({
      val: [
        'https://kano.guahao.com/rs1687956125',
        'https://kano.guahao.com/LSi687820266',
        'https://kano.guahao.com/soE687561865',
        'https://kano.guahao.com/1QE687641013',
      ],
    }),
    opacity: new AttrUtils.Slider({}),
  },
};

export { Schema };
export default schema;
