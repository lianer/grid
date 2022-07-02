import { BasicControlSchema } from '@/interface';
import { FC, PropsWithChildren } from 'react';
import s from './BasicControl.less';

const BasicControl: FC<PropsWithChildren<BasicControlSchema>> = function ({
  children,
  width,
  height,
  left,
  top,
}) {
  return (
    <div
      className={s.BasicControl}
      style={{
        width,
        height,
        left,
        top,
      }}
    >
      {children}
    </div>
  );
};

export default BasicControl;
