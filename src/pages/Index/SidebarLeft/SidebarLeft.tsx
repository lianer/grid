import { getMaterialList } from '@/lib/loader';
import { useAppDispatch } from '@/store/hooks';
import { add } from '@/store/stageSlice';
import { ComponentCategory, ComponentSchema } from '@/types';
import { useAsyncEffect } from 'ahooks';
import { List, Tabs } from 'antd';
import classnames from 'classnames';
import { FC, useState } from 'react';
import s from './SidebarLeft.less';

const defaultList: Record<ComponentCategory, ComponentSchema[]> = {
  basic: [],
  chart: [],
  map: [],
};

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
      className={classnames(
        'h-32 pt-6 pb-4 mb-0 overflow-hidden border-solid',
        borderRight,
        borderBottom,
        'border-gray-100 hover:bg-gray-50 opacity-60 hover:opacity-100 transition-opacity cursor-pointer',
      )}
      key={base.cid}
      onClick={addToStage}
    >
      <img
        className={classnames(
          'block w-10 h-10 mx-auto mb-2 object-contain fill-current	text-green-600',
          s.Icon,
        )}
        src={base.icon}
      />
      <span className="block text-base text-center">{base.name}</span>
    </List.Item>
  );
};

const SidebarLeft: FC = function () {
  const [category, setCategory] = useState<ComponentCategory>('basic');
  const [list, setList] = useState(defaultList);
  // const list = useAppSelector(selectMaterial);
  // const dispatch = useAppDispatch();

  // tab 切换的时候，将列表切换为对应类型的组件
  useAsyncEffect(async () => {
    // dispatch(updateListAsync({ payload: { category } }));
    const _list = await getMaterialList(category);
    setList({
      ...list,
      [category]: [..._list],
    });
  }, [category]);

  return (
    <Tabs
      className={classnames(s.SidebarLeft, 'h-full')}
      defaultActiveKey="basic"
      onChange={(activeKey) => setCategory(activeKey as ComponentCategory)}
      animated={false}
    >
      {Object.entries(tabs).map(([key, tab]) => (
        <TabPane tab={tab} key={key}>
          <List
            grid={{ column: 2, gutter: 0 }}
            dataSource={list[key as ComponentCategory]}
            renderItem={(item, index) => (
              <Item
                item={item}
                index={index}
                length={list[key as ComponentCategory].length}
              ></Item>
            )}
          />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default SidebarLeft;
