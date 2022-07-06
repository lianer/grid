import Control from '@/controls/Control/Control';
import { loadById } from '@/loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeAttrs, selectChildren } from '@/store/stageSlice';
import { AttrsSchema, InstanceSchema } from '@/types';
import { FC, memo, ReactNode, useCallback, useEffect, useState } from 'react';

// TODO: 增强 props 参数错误/缺少等异常情况的处理
// TODO: 层级控制，分背景层 layer.background、普通层 layer.normal、浮动层 layer.float、弹窗层 layer.popup

// 使用 memo 优化 children 变更导致的无效渲染
const CachedComp: FC<{
  child: InstanceSchema;
  Comp: React.LazyExoticComponent<React.ComponentType<any>>;
}> = memo(function ({ child, Comp }) {
  const dispatch = useAppDispatch();
  const onCompUpdate = useCallback((_attrs: AttrsSchema) => {
    dispatch(changeAttrs({ iid: child.iid, attrs: _attrs }));
  }, []);

  // console.log('CachedComp rerender');

  return (
    <Control key={child.iid} iid={child.iid} control={child.control}>
      <Comp {...child} stage={true} onCompUpdate={onCompUpdate}></Comp>
    </Control>
  );
});

const Stage: FC = function () {
  const [Components, setComponents] = useState<ReactNode[]>([]);
  const children = useAppSelector(selectChildren);

  // console.log('Stage rerender');

  useEffect(() => {
    const Components = children.map((child) => {
      // console.log(child, child.iid);

      const Comp = loadById(child.base.cid);
      return <CachedComp key={child.iid} child={child} Comp={Comp} />;
    });
    setComponents(Components);
  }, [children]);

  return (
    <div className="Stage relative h-full overflow-auto">{Components}</div>
  );
};

export default Stage;
