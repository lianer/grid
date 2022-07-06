import { AttrUtils } from '@/lib/AttrUtils';
import { useAppSelector } from '@/store/hooks';
import { InstanceSchema } from '@/types';
import { Tabs } from 'antd';
import s from './SidebarRight.less';

const { TabPane } = Tabs;

enum SidebarTabs {
  'GLOBAL' = '全局',
  'COMPONENT' = '组件',
  'EVENT' = '事件',
  'EFFECT' = '特效',
}

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
    <div className="ComponentAttrsEditor h-full">
      <header className="flex flex-row items-center h-10 bg-gray-50 px-2 ">
        <img className="inline-block mr-2 w-4 h-4" src={base.icon} />
        <span className="mr-2">{base.name}</span>
        <span className="text-gray-400 select-text">@{iid}</span>
      </header>
      <main className="overflow-auto p-2">
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

const GlobalAttrsEditor: React.FC = function () {
  return (
    <div className="GlobalAttrsEditor h-full overflow-auto">
      <header className="flex flex-row items-center h-10 bg-gray-50 px-2 ">
        <img className="inline-block mr-2 w-4 h-4" src={''} />
        <span className="mr-2">全局设置</span>
      </header>
      <main className="overflow-auto p-2">
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
        <h1>Global Editor</h1>
      </main>
    </div>
  );
};

const SidebarRight: React.FC = function () {
  const activatedInstanceSchema = useAppSelector((state) => {
    return state.stage.active !== -1
      ? state.stage.children.find((child) => child.iid === state.stage.active)
      : undefined;
  });

  return (
    <Tabs
      className={`${s.SidebarRight} h-full`}
      defaultActiveKey={SidebarTabs.GLOBAL}
    >
      <TabPane tab={SidebarTabs.GLOBAL} key={SidebarTabs.GLOBAL}>
        <GlobalAttrsEditor />
      </TabPane>
      {activatedInstanceSchema !== undefined && (
        <TabPane tab={SidebarTabs.COMPONENT} key={SidebarTabs.COMPONENT}>
          <ComponentAttrsEditor schema={activatedInstanceSchema} />;
        </TabPane>
      )}
    </Tabs>
  );
};

export default SidebarRight;
