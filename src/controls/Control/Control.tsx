import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { active, selectPresent } from '@/store/stageSlice';
import {
  AutoHeightControlSchema,
  BasicControlSchema,
  ControlSchema,
} from '@/types';
import classnames from 'classnames';
import { memo, PropsWithChildren, useCallback } from 'react';
import AutoHeightControl from '../AutoHeightControl/AutoHeightControl';
import BasicControl from '../BasicControl/BasicControl';

const ControlFilter: React.FC<
  PropsWithChildren<{ iid: number; isActive: boolean; control: ControlSchema }>
> = function ({ iid, isActive, children, control }) {
  switch (control.type) {
    case 'AutoHeightControlSchema':
      return (
        <AutoHeightControl
          iid={iid}
          isActive={isActive}
          control={control as AutoHeightControlSchema}
        >
          {children}
        </AutoHeightControl>
      );
    case 'BasicControlSchema':
    default:
      return (
        <BasicControl
          iid={iid}
          isActive={isActive}
          control={control as BasicControlSchema}
        >
          {children}
        </BasicControl>
      );
  }
};

// 因为 selectActive 是一个值，所以当它发生变化的时候，所有与它关联的组件都会重新渲染
// 但在舞台组件列表中，active 只与两个组件有关，一个是之前的组件（active 状态从 true 变成 false），一个是当前的组件（active 状态从 false 变成 true）
// 除了这两个组件外，其他组件的 active 状态都没有发生变化
// 如果要减少这种不必要的渲染，可以在 useAppSelector 中使用表达式，比如 `useAppSelector((state) => state.stage.active === iid)`
const Control: React.FC<
  PropsWithChildren<{ iid: number; control: ControlSchema }>
> = memo(function ({ children, iid, control }) {
  // 使用表达式减少不相关的组件的重新渲染
  const controlIsActive = useAppSelector(
    selectPresent((state) => state.currentActive === iid),
  );

  const dispatch = useAppDispatch();

  const onControlClick = useCallback(() => {
    if (!controlIsActive) dispatch(active({ iid }));
  }, [iid, controlIsActive]);

  return (
    <div
      className={classnames('Control relative', { 'z-10': controlIsActive })}
      onClick={onControlClick}
    >
      <ControlFilter iid={iid} isActive={controlIsActive} control={control}>
        {children}
      </ControlFilter>
    </div>
  );
});

export default Control;
