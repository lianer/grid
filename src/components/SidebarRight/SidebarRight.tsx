import { AttrUtils } from '@/lib/AttrUtils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeAttrs } from '@/store/stageSlice';
import { InstanceSchema } from '@/types';
import { Form, Input, Tabs } from 'antd';
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
  attr: AttrUtils.TextInput;
  update: (attr: any) => void;
}> = function ({ attr, update }) {
  return (
    <Form.Item label={attr.title}>
      <Input.TextArea
        value={attr.value}
        rows={attr.rows}
        maxLength={attr.range[1]}
        onChange={(e) => {
          update({ ...attr, value: e.target.value });
        }}
      />
    </Form.Item>
  );
};

const AttrEditorFilter: React.FC<{ attr: any; update: (attr: any) => void }> =
  function ({ attr, update }) {
    switch (attr.type) {
      case AttrUtils.TextInput.name:
        return <TextInputEditor attr={attr} update={update} />;
      default:
        return <div>未知类型</div>;
    }
  };

const GlobalAttrsEditor: React.FC = function () {
  return (
    <div className="GlobalAttrsEditor h-full p-2 overflow-auto">
      <h1>Global Editor</h1>
    </div>
  );
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

const EventEditor: React.FC = function () {
  return (
    <div className="EventEditor h-full">
      <p className="p-2">Events</p>
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
          <ComponentAttrsEditor instanceSchema={activeInstance} />
        </TabPane>
      )}
      <TabPane tab={TabsName[TabsEnum.EVENT]} key={TabsEnum.EVENT}>
        <EventEditor />
      </TabPane>
    </Tabs>
  );
};

export default SidebarRight;
