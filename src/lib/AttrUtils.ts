// 对应编辑表单的类型
// 每一种类型都对应一种编辑表单的样式，比如 TextInput 对应文本输入框，Int 对应数字输入框，Selector 对应选择框，ColorPicker 对应颜色选择器

export namespace AttrUtils {
  type GetElementType<T extends any[]> = T extends (infer U)[]
    ? U extends any[]
      ? GetElementType<U>
      : U
    : never;

  type PosRef = GetElementType<
    [
      ['left-top', 'top', 'right-top'],
      ['left', 'center', 'right'],
      ['left-bottom', 'bottom', 'right-bottom'],
    ]
  >;

  export class Position {
    type = 'Position';
    ref: PosRef;
    x: number;
    y: number;

    constructor(
      attrs: Partial<{
        ref: PosRef;
        x: number;
        y: number;
      }>,
    ) {
      this.ref = attrs.ref ?? 'left-top';
      this.x = attrs.x ?? 0;
      this.y = attrs.y ?? 0;
    }
  }

  export class Size {
    type = 'Size';
    width: number;
    height: number;

    constructor(attrs: Partial<{ width: number; height: number }>) {
      this.width = attrs.width ?? 200;
      this.height = attrs.height ?? 100;
    }
  }

  export class TextInput {
    type = 'TextInput';
    val: string;
    maxLen: number;
    minLen: number;

    constructor(
      attrs: Partial<{
        val: string;
        maxLen: number;
        minLen: number;
      }>,
    ) {
      this.val = attrs.val ?? '';
      this.maxLen = attrs.maxLen ?? 10000;
      this.minLen = attrs.minLen ?? 0;
    }
  }

  export class TextInputList {
    type = 'TextInputList';
    val: string[];
    maxListLen: number;
    minListLen: number;
    maxLen: number;
    minLen: number;

    constructor(
      attrs: Partial<{
        val: string[];
        maxListLen: number;
        minListLen: number;
        maxLen: number;
        minLen: number;
      }>,
    ) {
      this.val = attrs.val ?? [];
      this.maxListLen = attrs.maxListLen ?? 15;
      this.minListLen = attrs.minListLen ?? 0;
      this.maxLen = attrs.maxLen ?? 10000;
      this.minLen = attrs.minLen ?? 0;
    }
  }

  export class NumberInput {
    type = 'NumberInput';
    val: number;
    max: number;
    min: number;
    constructor(attrs: Partial<{ val: number; max: number; min: number }>) {
      this.val = attrs.val ?? 100;
      this.max = attrs.max ?? 100;
      this.min = attrs.min ?? 0;
    }
  }

  export class Selector {
    type = 'Selector';
    val: string;
    options: string[];
    constructor(attrs: Partial<{ val: string; options: string[] }>) {
      this.val = attrs.val ?? '-';
      this.options = attrs.options ?? [this.val];
    }
  }

  export class ColorPicker {
    type = 'ColorPicker';
    val: string;
    constructor(attrs: Partial<{ val: string }>) {
      this.val = attrs.val ?? '#000';
    }
  }

  export class Slider {
    type = 'Slider';
    val: number;
    max: number;
    min: number;
    constructor(attrs: Partial<{ val: number; max: number; min: number }>) {
      this.val = attrs.val ?? 100;
      this.max = attrs.max ?? 100;
      this.min = attrs.min ?? 0;
    }
  }
}

export default AttrUtils;
