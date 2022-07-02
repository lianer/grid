import { Schema } from '@/interface';
import { color, float, int, select, text } from './attrs';

const basicComps: Schema[] = [
  {
    id: 1,
    category: 'basic',
    icon: '',
    name: '文本',
    attrs: {
      text: text({}),
      fontSize: int({ defaultVal: 14 }),
      fontWeight: select({
        defaultVal: 'normal',
        selector: ['normal', 'bold', 'italic'],
      }),
      color: color({}),
      opacity: float({}),
    },
  },
  {
    id: 2,
    category: 'basic',
    icon: '',
    name: '图片',
    attrs: {
      width: int({ defaultVal: 200 }),
      height: int({ defaultVal: 80 }),
      opacity: float({}),
    },
  },
];

export default basicComps;
