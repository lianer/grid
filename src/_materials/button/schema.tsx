import { AttrUtils } from '@/lib/AttrUtils';
import { BasicControlSchema, DefineSchema } from '@/types';

type ComponentSchema = DefineSchema<
  BasicControlSchema,
  {
    text: AttrUtils.TextInput;
    size: AttrUtils.Selector<'large' | 'middle' | 'small', string>;
    type: AttrUtils.Selector<
      'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default',
      string
    >;
  }
>;

// TODO: 重新设计 attrs，改用数组
const schema: ComponentSchema = {
  base: {
    cid: 4,
    name: '按钮',
    icon: 'https://lianer-design-hd1.oss-cn-hangzhou.aliyuncs.com/projects/grid/button.svg',
    category: 'basic',
  },

  control: {
    type: 'BasicControlSchema',
    left: 0,
    top: 0,
  },

  attrs: {
    text: new AttrUtils.TextInput({ value: '按钮' }),
    size: new AttrUtils.Selector({
      title: '大小',
      selected: 'middle',
      options: [
        {
          label: '大',
          value: 'large',
        },
        {
          label: '标准',
          value: 'middle',
        },
        {
          label: '小',
          value: 'small',
        },
      ],
    }),
    type: new AttrUtils.Selector({
      title: '类型',
      selected: 'default',
      options: [
        {
          label: 'primary',
          value: 'primary',
        },
        {
          label: 'ghost',
          value: 'ghost',
        },
        {
          label: 'dashed',
          value: 'dashed',
        },
        {
          label: 'link',
          value: 'link',
        },
        {
          label: 'text',
          value: 'text',
        },
        {
          label: 'default',
          value: 'default',
        },
      ],
    }),
  },
};

export { ComponentSchema };
export default schema;
