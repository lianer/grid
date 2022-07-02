import Control from '@/controls/Control/Control';
import { DefineSchema } from '@/interface';
import { loadById } from '@/loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeProps, selectChildren } from '@/store/stageSlice';
import { ReactNode, useEffect, useState } from 'react';
import s from './Stage.less';

const Stage = function () {
  const [Components, setComponents] = useState<ReactNode[]>([]);
  const dispatch = useAppDispatch();
  const children = useAppSelector(selectChildren);

  useEffect(() => {
    const Components = children.map((props) => {
      const Comp = loadById(props.base.cid);
      return (
        <Control key={props.iid} {...props}>
          <Comp
            {...props}
            stage={true}
            onCompUpdate={(newProps: DefineSchema) => {
              // 暴露给组件直接修改自身属性的口子
              dispatch(changeProps({ iid: props.iid, props: newProps }));
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
