// 对应编辑表单的类型

import { isEmpty, isUndefined } from 'lodash-es';

export namespace AttrUtils {
  // 提取数组中的所有类型
  type GetElementType<T extends any[]> = T extends (infer U)[]
    ? U extends any[]
      ? GetElementType<U>
      : U
    : never;

  // 将常规的 Attr 包装为 List<Attr>，可以支持动态重复添加 Attr 或删除之
  // ! 不希望在 ComponentSchema 中储存构造函数
  // export class List<T> {
  //   type = List.name;
  //   list: T[];
  //   range: [number, number];

  //   constructor(attrs: Omit<List<T>, 'type'>) {
  //     this.list = attrs.list;
  //     this.range = attrs.range ?? [0, 100];
  //   }
  // }

  // 常规文本输入框
  export class TextInput {
    type = TextInput.name;
    title: string;
    value: string;
    range: [number, number];
    rows: number;
    constructor(attrs: Partial<TextInput>) {
      this.title = attrs.title ?? '内容';
      this.value = attrs.value ?? '文本';
      this.range = attrs.range ?? [0, 10000];
      this.rows = attrs.rows ?? 1;
    }
  }

  // 数字输入框
  export class NumberInput {
    type = NumberInput.name;
    title: string;
    value: number;
    range: [number, number];
    constructor(attrs: Partial<NumberInput>) {
      this.title = attrs.title ?? '数字';
      this.value = attrs.value ?? 100;
      this.range = attrs.range ?? [0, 10000];
    }
  }

  // 下拉框选择器
  export class Selector<V, L> {
    type = Selector.name;
    title: string;
    selected: V;
    options: { label: L; value: V }[];
    constructor(attrs: {
      title?: string;
      selected: V;
      options: { label: L; value: V }[];
    }) {
      this.title = attrs.title ?? '选择';
      this.options = attrs.options;
      this.selected = attrs.selected;
      if (isEmpty(this.options)) {
        throw new Error('[Grid] AttrUtils.Selector: options 不能为空');
      }
      if (isUndefined(this.selected)) {
        throw new Error('[Grid] AttrUtils.Selector: selected 不能为空');
      }
      if (
        !~this.options.findIndex((option) => option.value === this.selected)
      ) {
        throw new Error(
          `[Grid] AttrUtils.Selector: selected ${this.selected} 必须是 options ${this.options} 的其中一员`,
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
    value: number;
    range: [number, number];
    step: number;
    constructor(attrs: Partial<Slider>) {
      this.value = attrs.value ?? 100;
      this.range = attrs.range ?? [0, 100];
      this.step = attrs.step ?? 1;
    }
  }
}

// 检测错误的配置
Object.values(AttrUtils).forEach((Attr: any) => {
  const detectWhiteList = ['List', 'Selector'];

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
