import AttrUtils from '@/lib/AttrUtils';
import { useAppDispatch } from '@/store/hooks';
import { changeAttr } from '@/store/stageSlice';
import { InstanceSchema, UpdateAttr } from '@/types';
import { Form } from 'antd';
import ColorPickerEditor from './ColorPickerEditor/ColorPickerEditor';
import FontEditor from './FontEditor/FontEditor';
import NumberInputEditor from './NumberInputEditor/NumberInputEditor';
import SelectorEditor from './SelectorEditor/SelectorEditor';
import SliderEditor from './SliderEditor/SliderEditor';
import TextInputEditor from './TextInputEditor/TextInputEditor';

const AttrEditorFilter: React.FC<{
  iid: number;
  attr: any;
  update: UpdateAttr;
}> = function ({ iid, attr, update }) {
  switch (attr.type) {
    case AttrUtils.TextInput.name:
      return <TextInputEditor iid={iid} attr={attr} update={update} />;
    case AttrUtils.NumberInput.name:
      return <NumberInputEditor iid={iid} attr={attr} update={update} />;
    case AttrUtils.Selector.name:
      return <SelectorEditor iid={iid} attr={attr} update={update} />;
    case AttrUtils.ColorPicker.name:
      return <ColorPickerEditor iid={iid} attr={attr} update={update} />;
    case AttrUtils.Slider.name:
      return <SliderEditor iid={iid} attr={attr} update={update} />;
    case AttrUtils.Font.name:
      return <FontEditor iid={iid} attr={attr} update={update} />;
    default:
      return <div>未知属性</div>;
  }
};

const ComponentAttrsEditor: React.FC<{ instanceSchema: InstanceSchema }> =
  function ({ instanceSchema }) {
    const dispatch = useAppDispatch();
    const { iid, base, attrs } = instanceSchema;

    return (
      <div className="ComponentAttrsEditor flex flex-col h-full">
        <header className="flex flex-row items-center h-10 bg-gray-50 px-2 ">
          <img className="inline-block mr-2 w-4 h-4" src={base.icon} />
          <span className="mr-2">{base.name}</span>
          <span className="text-gray-400 select-text">@{iid}</span>
        </header>
        <main className="overflow-auto p-2">
          <Form
            wrapperCol={{ span: 24 }}
            labelAlign="left"
            layout="vertical"
            colon={false}
          >
            {Object.keys(attrs).map((attrName: string) => {
              // 在两个相同物料的实例之间切换时，
              // 如果 key 相同则会导致 react 复用 AttrEditorFilter，
              // 从而导致 ColorPickerEditor/SelectorEditor 等 Editor 内部会共享副作用
              // 因此这里不能使用 attrName 作为 key
              return (
                <AttrEditorFilter
                  key={`@${iid}/${attrName}`}
                  iid={iid}
                  attr={attrs[attrName]}
                  update={(newAttrValue) => {
                    dispatch(
                      changeAttr({
                        iid,
                        attrName,
                        attrValue: newAttrValue,
                      }),
                    );
                  }}
                />
              );
            })}
          </Form>
        </main>
      </div>
    );
  };

export default ComponentAttrsEditor;
