import { BaseSchema, Category } from '@/interface';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateList } from '@/store/materialSlice';
import { useMount } from 'ahooks';
import { List, Tabs } from 'antd';
import { FC, useEffect, useState } from 'react';
import { selectMaterial } from '../../store/materialSlice';
import s from './SidebarLeft.less';

const { TabPane } = Tabs;

const Item: FC<{ item: BaseSchema }> = ({ item }) => (
  <List.Item className={s.BasicList} key={item.$id}>
    <div className={s.ListItem}>
      <img src={item.$icon} />
      <span>{item.$name}</span>
    </div>
  </List.Item>
);

const InternalList: FC<{ list: BaseSchema[] }> = ({ list }) => (
  <List
    className={s.List}
    grid={{ column: 4, gutter: 8 }}
    dataSource={list}
    renderItem={(item) => <Item item={item}></Item>}
  />
);

const Material: FC = function () {
  const [category, setCategory] = useState<Category>(Category.basic);
  const list = useAppSelector(selectMaterial);
  const dispatch = useAppDispatch();

  // tab 切换的时候，将列表切换为对应类型的组件
  useEffect(() => {
    dispatch(updateList({ category }));
  }, [category]);

  useMount(() => {
    dispatch(updateList({ category }));
  });

  return (
    <Tabs
      className={s.Tabs}
      defaultActiveKey="basic"
      onChange={(activeKey) => setCategory(activeKey as Category)}
    >
      <TabPane tab="基础控件" key="basic">
        <InternalList list={list} />
      </TabPane>
      <TabPane tab="可视化组件" key="chart">
        <InternalList list={list} />
      </TabPane>
      <TabPane tab="地图组件" key="map">
        <InternalList list={list} />
      </TabPane>
    </Tabs>
  );
};

export default Material;
