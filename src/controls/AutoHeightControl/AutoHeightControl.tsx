import { AutoHeightControlSchema } from '@/interface';
import { FC, PropsWithChildren } from 'react';
import s from './AutoHeightControl.less';

const BasicControl: FC<PropsWithChildren<AutoHeightControlSchema>> = function ({
  children,
  width,
  left,
  top,
}) {
  return (
    <div
      className={s.BasicControl}
      style={{
        width,
        height: 'auto',
        left,
        top,
      }}
    >
      {children}
    </div>
  );
};

export default BasicControl;
