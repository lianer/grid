import AttrUtils from '@/lib/AttrUtils';
import { useAppDispatch } from '@/store/hooks';
import { changeAttrs } from '@/store/stageSlice';
import { InstanceSchema } from '@/types';
import { Form } from 'antd';
import TextInputEditor from './TextInputEditor/TextInputEditor';

const AttrEditorFilter: React.FC<{ attr: any; update: (attr: any) => void }> =
  function ({ attr, update }) {
    switch (attr.type) {
      case AttrUtils.TextInput.name:
        return <TextInputEditor attr={attr} update={update} />;
      default:
        return <div>未知属性</div>;
    }
  };

const ComponentAttrsEditor: React.FC<{ instanceSchema: InstanceSchema }> =
  function ({ instanceSchema }) {
    const dispatch = useAppDispatch();
    const { iid, base, control, attrs } = instanceSchema;

    return (
      <div className="ComponentAttrsEditor h-full">
        <header className="flex flex-row items-center h-10 bg-gray-50 px-2 ">
          <img className="inline-block mr-2 w-4 h-4" src={base.icon} />
          <span className="mr-2">{base.name}</span>
          <span className="text-gray-400 select-text">@{iid}</span>
        </header>
        <main className="overflow-auto p-2">
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            labelAlign="left"
          >
            {Object.entries(attrs).map(([name, attr]: [string, any]) => (
              <AttrEditorFilter
                key={name}
                attr={attr}
                update={(_attr) => {
                  dispatch(
                    changeAttrs({
                      iid,
                      attrs: {
                        ...attrs,
                        [name]: _attr,
                      },
                    }),
                  );
                }}
              />
            ))}
          </Form>
        </main>
      </div>
    );
  };

export default ComponentAttrsEditor;
