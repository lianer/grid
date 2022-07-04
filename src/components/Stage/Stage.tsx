import Control from '@/controls/Control/Control';
import { loadById } from '@/loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeAttrs, selectChildren } from '@/store/stageSlice';
import { AttrsSchema } from '@/types';
import { FC, ReactNode, useEffect, useState } from 'react';
import s from './Stage.less';

const Stage: FC = function () {
  const [Components, setComponents] = useState<ReactNode[]>([]);
  const dispatch = useAppDispatch();
  const children = useAppSelector(selectChildren);

  // TODO: 增强 props 参数错误/缺少等异常情况的处理

  useEffect(() => {
    const Components = children.map((child) => {
      const Comp = loadById(child.base.cid);
      return (
        <Control key={child.iid} control={child.control}>
          <Comp
            {...child}
            stage={true}
            onCompUpdate={(_attrs: AttrsSchema) => {
              // 暴露给组件直接修改自身属性的口子
              dispatch(changeAttrs({ iid: child.iid, attrs: _attrs }));
            }}
          ></Comp>
        </Control>
      );
    });
    setComponents(Components);
  }, [children]);

  return <div className={s.Stage}>{Components}</div>;
};

export default Stage;
