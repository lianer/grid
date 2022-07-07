import { useAppSelector } from '@/store/hooks';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import ComponentAttrsEditor from './ComponentAttrsEditor/ComponentAttrsEditor';
import EventEditor from './EventEditor/EventEditor';
import GlobalAttrsEditor from './GlobalAttrsEditor/GlobalAttrsEditor';
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
