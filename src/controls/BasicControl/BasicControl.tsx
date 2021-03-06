import { useAppDispatch } from '@/store/hooks';
import { changeControl } from '@/store/stageSlice';
import { BasicControlSchema } from '@/types';
import classnames from 'classnames';
import { isEqual } from 'lodash-es';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
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

  // 当 control 发生变化的时候，需要重新映射到 localControl
  useEffect(() => {
    setLocalControl({ ...control });
  }, [control]);

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
    if (isEqual(control, localControl)) return;
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
      dragGrid={[1, 1]}
      resizeGrid={[1, 1]}
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
      onResize={(e, d, ref, delta, position) => {
        const { width, height } = ref.getBoundingClientRect();
        setLocalControl({
          ...control,
          left: position.x, // 拖拽左/上边框调整尺寸时，需要响应 position 的变化
          top: position.y,
          width: autoWidth ? undefined : width,
          height: autoHeight ? undefined : height,
        });
      }}
      onResizeStop={dispatchChangeControl}
    >
      <div
        className={classnames('BasicControl', s.BasicControl, {
          [s.Active]: isActive,
        })}
        style={{
          width: autoWidth ? undefined : `${localControl.width}px`,
          height: autoHeight ? undefined : `${localControl.height}px`,
        }}
      >
        <div className="BasicControlContainer w-full h-full">{children}</div>
        <div
          className={classnames(
            'absolute left-0 top-0 w-full h-full opacity-10',
            { 'bg-blue-400': isActive },
          )}
        ></div>
      </div>
    </Rnd>
  );
};

export default BasicControl;
