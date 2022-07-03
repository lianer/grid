import { AutoHeightControlSchema } from '@/types';
import { FC, PropsWithChildren } from 'react';
import s from './AutoHeightControl.less';

const BasicControl: FC<
  PropsWithChildren<{ control: AutoHeightControlSchema }>
> = function ({ children, control }) {
  const { width, left, top } = control;
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
