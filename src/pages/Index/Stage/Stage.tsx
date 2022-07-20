import Control from '@/controls/Controls';
import { loadById } from '@/lib/loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { inactive, selectChildren, selectPresent } from '@/store/stageSlice';
import { InstanceSchema } from '@/types';
import classnames from 'classnames';
import {
  FC,
  memo,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import s from './Stage.less';

// TODO: 增强 props 参数错误/缺少等异常情况的处理
// TODO: 层级控制，分背景层 layer.background、普通层 layer.normal、浮动层 layer.float、弹窗层 layer.popup

// 使用 memo 优化 children 变更导致的无效渲染
const CachedComp: FC<{
  child: InstanceSchema;
  Comp: React.LazyExoticComponent<React.ComponentType<any>>;
}> = memo(function ({ child, Comp }) {
  return (
    <Control key={child.iid} iid={child.iid} control={child.control}>
      <Comp key={child.iid} {...child} stage={true}></Comp>
    </Control>
  );
});

const Stage: FC = function () {
  const dispatch = useAppDispatch();
  const children = useAppSelector(selectChildren);
  const width = useAppSelector(selectPresent((state) => state.width));
  const height = useAppSelector(selectPresent((state) => state.height));
  const currentActive = useAppSelector(
    selectPresent((state) => state.currentActive),
  );

  const [Components, setComponents] = useState<ReactNode[]>([]);

  // 异步加载组件并生成舞台实例
  useEffect(() => {
    const Components = children.map((child) => {
      const Comp = loadById(child.base.cid);
      return <CachedComp key={child.iid} child={child} Comp={Comp} />;
    });
    setComponents(Components);
  }, [children]);

  const onStageClick = (e: SyntheticEvent<HTMLDivElement>) => {
    // 当 Stage 或 Room 被点击的时候，将 active 置为 null
    if (
      currentActive &&
      (e.target === e.currentTarget ||
        (e.target &&
          (e.target as HTMLDivElement).parentNode === e.currentTarget))
    ) {
      dispatch(inactive());
    }
  };

  return (
    <div
      className="Room relative h-full overflow-auto p-16"
      onClick={onStageClick}
    >
      <div
        className={classnames(s.Stage, 'Stage relative h-full bg-white')}
        style={{
          width,
          height,
        }}
      >
        {Components}
      </div>
    </div>
  );
};

export default Stage;
