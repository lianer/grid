import { useAppDispatch } from '@/store/hooks';
import { move } from '@/store/stageSlice';
import { BasicControlSchema } from '@/types';
import { FC, PropsWithChildren } from 'react';
import { Rnd } from 'react-rnd';

const BasicControl: FC<
  PropsWithChildren<{
    iid: number;
    isActive: boolean;
    control: BasicControlSchema;
  }>
> = function ({ children, iid, isActive, control }) {
  const dispatch = useAppDispatch();
  const { width, height, left, top } = control;

  return (
    <Rnd
      position={{
        x: left,
        y: top,
      }}
      onDragStop={(e, d) => {
        dispatch(move({ iid, x: d.x, y: d.y }));
      }}
    >
      <div
        className="BasicControl"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          outline: isActive ? '2px dashed #45a6ff' : 'none',
        }}
      >
        <div className="BasicControlContainer">{children}</div>
        <div
          className={`absolute left-0 top-0 w-full h-full opacity-10 ${
            isActive ? 'bg-blue-400' : ''
          }`}
        ></div>
      </div>
    </Rnd>
  );
};

export default BasicControl;
