import { AutoHeightControlSchema } from '@/types';
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
        className={`absolute left-0 top-0 w-full h-full opacity-10 ${
          isActive ? 'bg-blue-300' : ''
        }`}
      ></div>
    </div>
  );
};

export default Control;
