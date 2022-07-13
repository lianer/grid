import { AutoHeightControlSchema } from '@/types';
import classnames from 'classnames';
import { FC, PropsWithChildren } from 'react';

const Control: FC<
  PropsWithChildren<{
    iid: number;
    isActive: boolean;
    control: AutoHeightControlSchema;
  }>
> = function ({ children, iid, isActive, control }) {
  const { width, left, top } = control;
  return (
    <div
      className="relative"
      style={{
        width,
        left,
        top,
        outline: isActive ? '2px dashed #45a6ff' : 'none',
        zIndex: isActive ? 2 : 1,
      }}
    >
      <div>{children}</div>
      <div
        className={classnames(
          'absolute left-0 top-0 w-full h-full opacity-10',
          {
            'bg-blue-300': isActive,
          },
        )}
      ></div>
    </div>
  );
};

export default Control;
