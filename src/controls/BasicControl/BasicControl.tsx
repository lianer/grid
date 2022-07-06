import { useAppDispatch } from '@/store/hooks';
import { changeControl } from '@/store/stageSlice';
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

  const autoHeight = height === undefined;
  const resizeOptions = {
    top: !autoHeight,
    topLeft: !autoHeight,
    topRight: !autoHeight,
    left: true,
    right: true,
    bottom: !autoHeight,
    bottomLeft: !autoHeight,
    bottomRight: !autoHeight,
  };

  return (
    <Rnd
      disableDragging={!isActive}
      enableResizing={isActive ? resizeOptions : false}
      position={{
        x: left,
        y: top,
      }}
      onDragStop={(e, d) => {
        // 当实例移动时，在 ControlComponent 中更新 ControlSchema
        dispatch(
          changeControl({
            iid,
            control: {
              ...control,
              left: d.x,
              top: d.y,
            },
          }),
        );
      }}
      onResize={(e, d, ref) => {
        // 当实例尺寸发生变化时，在 ControlComponent 中更新 ControlSchema
        // ControlSchema 与 ControlComponent 是一对一的关系
        // Redux changeControl 并不清楚提交过来的是哪个 ControlSchema
        // 因此需要在 ControlComponent 中处理好数据后再触发 dispatch 更新 Redux
        const { width, height } = ref.getBoundingClientRect();
        dispatch(
          changeControl({
            iid,
            control: {
              ...control,
              width,
              height: autoHeight ? undefined : height,
            },
          }),
        );
      }}
    >
      <div
        className="BasicControl"
        style={{
          width: `${width}px`,
          height: autoHeight ? undefined : `${height}px`,
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
