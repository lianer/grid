import { loadById } from '@/loader';
import { useAppSelector } from '@/store/hooks';
import { selectChildren } from '@/store/stageSlice';
import { ReactNode, useEffect, useState } from 'react';
import s from './Stage.less';

const Stage = function () {
  const [Components, setComponents] = useState<ReactNode[]>([]);
  const children = useAppSelector(selectChildren);

  useEffect(() => {
    const Components = children.map((props) => {
      const Comp = loadById(props.$cid);
      return <Comp key={props.$iid} {...props}></Comp>;
    });
    setComponents(Components);
  }, [children]);

  return <div className={s.Stage}>{Components}</div>;
};

export default Stage;
