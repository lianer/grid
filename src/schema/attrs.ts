// 对应编辑表单的类型
// 每一种类型都对应一种编辑表单的样式，比如 TextInput 对应文本输入框，Int 对应数字输入框，Selector 对应选择框，ColorPicker 对应颜色选择器

export namespace Attrs {
  export class TextInput {
    type = 'TextInput';
    val: string;
    maxLen: number;
    minLen: number;
    constructor(
      props: Partial<{ val: string; maxLen: number; minLen: number }>,
    ) {
      this.val = props.val ?? '';
      this.maxLen = props.maxLen ?? 10000;
      this.minLen = props.minLen ?? 0;
    }
  }

  export class NumberInput {
    type = 'NumberInput';
    val: number;
    max: number;
    min: number;
    constructor(props: Partial<{ val: number; max: number; min: number }>) {
      this.val = props.val ?? 100;
      this.max = props.max ?? 100;
      this.min = props.min ?? 0;
    }
  }

  export class Selector {
    type = 'Selector';
    val: string;
    options: string[];
    constructor(props: Partial<{ val: string; options: string[] }>) {
      this.val = props.val ?? '-';
      this.options = props.options ?? [this.val];
    }
  }

  export class ColorPicker {
    type = 'ColorPicker';
    val: string;
    constructor(props: Partial<{ val: string }>) {
      this.val = props.val ?? '#fff';
    }
  }

  export class Slider {
    type = 'Slider';
    val: number;
    max: number;
    min: number;
    constructor(props: Partial<{ val: number; max: number; min: number }>) {
      this.val = props.val ?? 100;
      this.max = props.max ?? 100;
      this.min = props.min ?? 0;
    }
  }
}

export default Attrs;
