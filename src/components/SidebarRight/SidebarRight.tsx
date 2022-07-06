import { AttrUtils } from '@/lib/AttrUtils';
import { useAppSelector } from '@/store/hooks';
import { InstanceSchema } from '@/types';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import s from './SidebarRight.less';

const { TabPane } = Tabs;

enum TabsEnum {
  'GLOBAL' = 'global',
  'COMPONENT' = 'component',
  'EVENT' = 'event',
  'EFFECT' = 'effect',
}

const TabsName = {
  [TabsEnum.GLOBAL]: '全局',
  [TabsEnum.COMPONENT]: '组件',
  [TabsEnum.EVENT]: '事件',
  [TabsEnum.EFFECT]: '特效',
};

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
    <div className="GlobalAttrsEditor h-full p-2 overflow-auto">
      <h1>Global Editor</h1>
    </div>
  );
};

const SidebarRight: React.FC = function () {
  const activeInstance = useAppSelector((state) => {
    return state.stage.active !== -1
      ? state.stage.children.find((child) => child.iid === state.stage.active)
      : undefined;
  });

  const [activeKey, setActiveKey] = useState<TabsEnum>(TabsEnum.GLOBAL);
  const activatedIID = activeInstance?.iid;
  useEffect(() => {
    // 当选中一个实例时，默认激活“组件”Tab
    // 当无实例选中时，默认激活“全局”Tab
    // 在实例之间切换选择不会切换Tab
    if (activatedIID !== undefined) {
      setActiveKey(TabsEnum.COMPONENT);
    } else {
      setActiveKey(TabsEnum.GLOBAL);
    }
  }, [activatedIID === undefined]);

  return (
    <Tabs
      className={`${s.SidebarRight} h-full`}
      defaultActiveKey={TabsEnum.GLOBAL}
      activeKey={activeKey}
      animated={false}
      onTabClick={(key) => setActiveKey(key as TabsEnum)}
    >
      <TabPane tab={TabsName[TabsEnum.GLOBAL]} key={TabsEnum.GLOBAL}>
        <GlobalAttrsEditor />
      </TabPane>
      {activeInstance !== undefined && (
        <TabPane tab={TabsName[TabsEnum.COMPONENT]} key={TabsEnum.COMPONENT}>
          <ComponentAttrsEditor schema={activeInstance} />
        </TabPane>
      )}
    </Tabs>
  );
};

export default SidebarRight;
