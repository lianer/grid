import AttrUtils from '@/lib/AttrUtils';
import StorageUtil from '@/lib/StorageUtil';
import { UpdateAttr } from '@/types';
import { HistoryOutlined } from '@ant-design/icons';
import { Form, Popover } from 'antd';
import { debounce } from 'lodash-es';
import { useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import s from './ColorPickerEditor.less';

const debounced = debounce(
  (fn: Function, ...args: unknown[]) => fn(...args),
  100,
);

const colorStorage = new StorageUtil({
  key: 'ColorPickerEditor.recentlyColors',
});
const maxRecentlyColors = 10;

// 更新本地存储，记录最近使用的颜色值
const updateRecentlyColors = function (value: string) {
  const oldColors = colorStorage.read() ?? [];

  const existsIndex = oldColors.findIndex((v: string) => v === value);
  if (~existsIndex) {
    oldColors.splice(existsIndex, 1);
  }

  const newColors = [value, ...oldColors];
  if (newColors.length > maxRecentlyColors) {
    newColors.length = maxRecentlyColors;
  }

  colorStorage.save(newColors);
};

// 颜色选择器
const ColorPickerEditor: React.FC<{
  iid: number;
  attr: AttrUtils.ColorPicker;
  update: UpdateAttr;
}> = function ({ iid, attr, update }) {
  const recentlyColors = colorStorage.read() ?? [];

  const updateColorImmediate = useCallback((color: string) => {
    updateRecentlyColors(color);
    update({ ...attr, value: color });
  }, []);

  // 最近使用的颜色
  const Recently = (
    <div className="Recently flex flex-row items-center h-6 px-1 rounded-bl-lg rounded-br-lg overflow-hidden">
      <HistoryOutlined className="ml-1 mr-1" />
      {recentlyColors.map((color: string) => (
        <div
          key={color}
          className="ColorButton block w-4 h-4 mr-px last:mr-0 border border-gray-200 hover:border-gray-900 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => updateColorImmediate(color)}
        ></div>
      ))}
    </div>
  );

  // 弹窗内容
  const PopoverContent = (
    <>
      <HexColorPicker
        color={attr.value}
        onChange={(value: string) => {
          debounced(updateColorImmediate, value);
        }}
      />
      {Recently}
    </>
  );

  return (
    <Form.Item label={attr.title}>
      <div className="Container flex flex-row items-center">
        <Popover
          overlayClassName={s.ColorPickerEditorPopover}
          placement="bottom"
          trigger="click"
          content={PopoverContent}
          getPopupContainer={() => document.querySelector('#root')!}
        >
          <div
            className="ColorPicker w-6 h-6 mr-8 border rounded-md cursor-pointer"
            style={{ backgroundColor: attr.value }}
          ></div>
        </Popover>
      </div>
    </Form.Item>
  );
};

export default ColorPickerEditor;
