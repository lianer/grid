import { BasicControlSchema } from '@/types';
import { FC, PropsWithChildren } from 'react';
import s from './BasicControl.less';

const BasicControl: FC<PropsWithChildren<{ control: BasicControlSchema }>> =
  function ({ children, control }) {
    const { width, height, left, top } = control;
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
