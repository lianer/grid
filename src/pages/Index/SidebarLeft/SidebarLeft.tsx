import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectMaterial, updateList } from '@/store/materialSlice';
import { add } from '@/store/stageSlice';
import { ComponentCategory, ComponentSchema } from '@/types';
import { List, Tabs } from 'antd';
import { FC, useEffect, useState } from 'react';
import s from './SidebarLeft.less';

const tabs: Record<ComponentCategory, string> = {
  basic: '基础控件',
  chart: '可视化组件',
  map: '地图组件',
};

const { TabPane } = Tabs;

const Item: FC<{ item: ComponentSchema; index: number; length: number }> = ({
  item,
  index,
  length,
}) => {
  const dispatch = useAppDispatch();

  const addToStage = function () {
    console.log(
      `[Grid] add component(cid: ${item.base.cid}) %o to stage`,
      item,
    );
    dispatch(add({ schema: item }));
  };

  const base = item.base;

  const borderRight = index % 2 === 0 ? 'border-r' : 'border-r-0';
  const borderBottom =
    index <= Math.floor((length - 1) / 2) ? 'border-b' : 'border-b-0';

  return (
    <List.Item
      className={`h-32 pt-6 pb-4 mb-0 overflow-hidden border-solid ${borderRight} ${borderBottom} border-gray-100 hover:bg-gray-50 opacity-60 hover:opacity-100 transition-opacity`}
      key={base.cid}
      onClick={addToStage}
    >
      <img
        className={`block w-10 h-10 mx-auto mb-2 object-contain fill-current	text-green-600 ${s.Icon}`}
        src={base.icon}
      />
      <span className="block text-base text-center">{base.name}</span>
    </List.Item>
  );
};

const SidebarLeft: FC = function () {
  const [category, setCategory] = useState<ComponentCategory>('basic');
  const list = useAppSelector(selectMaterial);
  const dispatch = useAppDispatch();

  // tab 切换的时候，将列表切换为对应类型的组件
  useEffect(() => {
    dispatch(updateList({ category }));
  }, [category]);

  return (
    <Tabs
      className={`${s.SidebarLeft} h-full`}
      defaultActiveKey="basic"
      onChange={(activeKey) => setCategory(activeKey as ComponentCategory)}
      animated={false}
    >
      {Object.entries(tabs).map(([key, tab]) => (
        <TabPane tab={tab} key={key}>
          <List
            grid={{ column: 2, gutter: 0 }}
            dataSource={list}
            renderItem={(item, index) => (
              <Item item={item} index={index} length={list.length}></Item>
            )}
          />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default SidebarLeft;
