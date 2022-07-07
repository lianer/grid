import { useAppDispatch } from '@/store/hooks';
import { changeControl } from '@/store/stageSlice';
import { BasicControlSchema } from '@/types';
import { FC, PropsWithChildren, useState } from 'react';
import { Rnd } from 'react-rnd';
import s from './BasicControl.less';

const BasicControl: FC<
  PropsWithChildren<{
    iid: number;
    isActive: boolean;
    control: BasicControlSchema;
  }>
> = function ({ children, iid, isActive, control }) {
  const dispatch = useAppDispatch();

  // 使用 state 储存 move、resize 等操作产生的临时数据
  const [localControl, setLocalControl] = useState<BasicControlSchema>({
    ...control,
  });

  const autoWidth = localControl.width === undefined;
  const autoHeight = localControl.height === undefined;
  const resizeOptions = {
    top: !autoHeight,
    topLeft: !autoHeight,
    topRight: !autoHeight,
    left: !autoWidth,
    right: !autoWidth,
    bottom: !autoHeight,
    bottomLeft: !autoHeight,
    bottomRight: !autoHeight,
  };

  // 当 move、resize 结束后，一次性提交最新的 state，更新到 schema 中
  const dispatchChangeControl = () => {
    dispatch(
      changeControl({
        iid,
        control: {
          ...localControl,
        },
      }),
    );
  };

  return (
    <Rnd
      disableDragging={!isActive}
      enableResizing={isActive ? resizeOptions : false}
      position={{
        x: localControl.left,
        y: localControl.top,
      }}
      onDrag={(e, d) => {
        setLocalControl({
          ...localControl,
          left: d.x,
          top: d.y,
        });
      }}
      onDragStop={dispatchChangeControl}
      onResize={(e, d, ref) => {
        const { width, height } = ref.getBoundingClientRect();
        setLocalControl({
          ...control,
          width: autoWidth ? undefined : width,
          height: autoHeight ? undefined : height,
        });
      }}
      onResizeStop={dispatchChangeControl}
    >
      <div
        className={`BasicControl ${s.BasicControl} ${isActive ? s.Active : ''}`}
        style={{
          width: autoWidth ? undefined : `${localControl.width}px`,
          height: autoHeight ? undefined : `${localControl.height}px`,
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
