// 对应编辑表单的类型

import { isEmpty, isUndefined } from 'lodash-es';

export namespace AttrUtils {
  // 常规文本输入框
  export class TextInput {
    type = TextInput.name;
    title: string;
    value: string;
    minLength: number;
    maxLength: number;
    rows: number;
    constructor(attrs: Partial<TextInput>) {
      this.title = attrs.title ?? '内容';
      this.value = attrs.value ?? '文本';
      this.minLength = attrs.minLength ?? 0;
      this.maxLength = attrs.maxLength ?? 10000;
      this.rows = attrs.rows ?? 1;
    }
  }

  // 数字输入框
  export class NumberInput {
    type = NumberInput.name;
    title: string;
    value: number;
    min: number;
    max: number;
    constructor(attrs: Partial<NumberInput>) {
      this.title = attrs.title ?? '数字';
      this.value = attrs.value ?? 100;
      this.min = attrs.min ?? 0;
      this.max = attrs.max ?? 10000;
    }
  }

  // 下拉框选择器
  export class Selector<V, L> {
    type = Selector.name;
    title: string;
    value: V;
    options: { label: L; value: V }[];
    constructor(attrs: {
      title?: string;
      value: V;
      options: { label: L; value: V }[];
    }) {
      this.title = attrs.title ?? '选择';
      this.options = attrs.options;
      this.value = attrs.value;
      if (isEmpty(this.options)) {
        throw new Error('[Grid] AttrUtils.Selector: options 不能为空');
      }
      if (isUndefined(this.value)) {
        throw new Error('[Grid] AttrUtils.Selector: value 不能为空');
      }
      if (!~this.options.findIndex((option) => option.value === this.value)) {
        throw new Error(
          `[Grid] AttrUtils.Selector: value ${this.value} 必须是 options ${this.options} 的其中一员`,
        );
      }
    }
  }

  // 颜色选择器
  export class ColorPicker {
    type = ColorPicker.name;
    title: string;
    value: string;
    constructor(attrs: Partial<ColorPicker>) {
      this.title = attrs.title ?? '颜色';
      this.value = attrs.value ?? '#000';
    }
  }

  // 滑块
  export class Slider {
    type = Slider.name;
    title: string;
    value: number;
    min: number;
    max: number;
    step: number;
    constructor(attrs: Partial<Slider>) {
      this.title = attrs.title ?? '选择';
      this.value = attrs.value ?? 100;
      this.min = attrs.min ?? 0;
      this.max = attrs.max ?? 100;
      this.step = attrs.step ?? 1;
    }
  }

  // 字体
  export class Font {
    type = Font.name;
    title: string;
    typeface: string;
    size: number;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    through: boolean;
    constructor(attr: Partial<Font>) {
      this.title = attr.title ?? '字体';
      this.typeface = attr.typeface ?? 'sans-serif';
      this.size = attr.size ?? 14;
      this.bold = attr.bold ?? false;
      this.italic = attr.italic ?? false;
      this.underline = attr.underline ?? false;
      this.through = attr.through ?? false;
    }
  }

  // 文字对齐
  export type TextAlignHorizontal = 'left' | 'center' | 'right' | 'justify';
  export type TextAlignVertical = 'top' | 'middle' | 'bottom';
  export class TextAlign {
    type = TextAlign.name;
    title: string;
    horizontal: TextAlignHorizontal;
    vertical: TextAlignVertical;
    constructor(attr: {
      title?: string;
      horizontal?: TextAlignHorizontal;
      vertical?: TextAlignVertical;
    }) {
      this.title = attr.title ?? '对齐';
      this.horizontal = attr.horizontal ?? 'left';
      this.vertical = attr.vertical ?? 'top';
    }
  }
}

// 检测错误的配置
Object.values(AttrUtils).forEach((Attr: any) => {
  const detectWhiteList = [
    'List',
    'Selector',
    'TextAlignHorizontal',
    'TextAlignVertical',
  ];

  if (detectWhiteList.includes(Attr.name)) return;

  let attr;

  try {
    attr = new Attr({});
  } catch (e) {
    console.error(
      `[Grid] AttrUtils: 无法通过 new ${Attr.name} 构造 Attr 实例，请检查 AttrUtils.${Attr.name} 的配置`,
    );
    return;
  }

  if (Attr.name !== attr.type) {
    console.error(
      `[Grid] AttrUtils: AttrUtils.${Attr.name} 的 type 与该类的名称不同，请保持它们是一致的`,
    );
  }
});

export default AttrUtils;
