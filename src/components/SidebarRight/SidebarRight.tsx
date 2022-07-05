import { AttrUtils } from '@/lib/AttrUtils';
import { InstanceSchema } from '@/types';

const TextInputEditor: React.FC<{
  attrName: string;
  attrVal: AttrUtils.TextInput;
}> = function ({ attrName, attrVal }) {
  return (
    <div>
      <p>{attrName}</p>
      <p>{JSON.stringify(attrVal)}</p>
    </div>
  );
};

const AttrEditorFilter: React.FC<{ attrName: string; attrVal: any }> =
  function ({ attrName, attrVal }) {
    switch (attrVal.type) {
      case AttrUtils.TextInput.name:
        return <TextInputEditor attrName={attrName} attrVal={attrVal} />;
      default:
        return <div>未知类型</div>;
    }
  };

const ComponentAttrsEditor: React.FC<{ schema: InstanceSchema }> = function ({
  schema,
}) {
  const { iid, base, control, attrs } = schema;
  return (
    <div className="">
      <header className="flex flex-row items-center h-10 bg-gray-50 px-2 ">
        <img className="inline-block mr-2 w-4 h-4" src={base.icon} />
        <span className="mr-2">{base.name}</span>
        <span className="text-gray-400 select-text">@{iid}</span>
      </header>
      <main>
        {Object.entries(attrs).map(([attrName, attrVal]: [string, any]) => (
          <AttrEditorFilter
            key={attrName}
            attrName={attrName}
            attrVal={attrVal}
          />
        ))}
      </main>
    </div>
  );
};

const Sidebarright: React.FC = function () {
  // const activatedInstanceSchema = useAppSelector(selectActivatedChild);
  const activatedInstanceSchema = null;

  if (activatedInstanceSchema) {
    return <ComponentAttrsEditor schema={activatedInstanceSchema} />;
  } else {
    return <div>Global Editor</div>;
  }
};

export default Sidebarright;
