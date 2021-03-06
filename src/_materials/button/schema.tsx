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
      value: 'middle',
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
      value: 'default',
      options: [
        {
          label: '重要',
          value: 'primary',
        },
        {
          label: '幽灵',
          value: 'ghost',
        },
        {
          label: '虚线',
          value: 'dashed',
        },
        {
          label: '链接',
          value: 'link',
        },
        {
          label: '文本',
          value: 'text',
        },
        {
          label: '默认',
          value: 'default',
        },
      ],
    }),
  },
};

export { ComponentSchema };
export default schema;
