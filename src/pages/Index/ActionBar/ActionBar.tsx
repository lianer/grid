import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFuture, selectPast } from '@/store/stageSlice';
import {
  HistoryOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button, Slider } from 'antd';
import classnames from 'classnames';
import { useState } from 'react';
import { ActionCreators } from 'redux-undo';
import { Link } from 'umi';

const ActionBar: React.FC = function () {
  const dispatch = useAppDispatch();

  const timeline = useAppSelector((state) => {
    const { index, past, future } = state.stage;
    return {
      index: index ?? 1,
      length: past.length + future.length + 1,
    };
  });
  const past = useAppSelector(selectPast);
  const future = useAppSelector(selectFuture);

  const [timelineVisisble, setTimelineVisible] = useState(false);

  return (
    <div
      className="ActionBar flex flex-row items-center h-16 px-4 overflow-hidden text-2xl border-b bg-white rounded-t-xl"
      style={{ boxShadow: '0 -3px 3px rgba(0, 0, 0, 0.03)' }}
    >
      <div className="GridLogo w-80">
        <Link to="/" className="inline-block">
          <h1 className="mb-0">Grid</h1>
        </Link>
      </div>
      <div className="Actions flex flex-row items-center gap-2">
        <Button
          className={classnames(
            past.length > 0
              ? ['opacity-60', 'hover:opacity-100']
              : ['opacity-20'],
          )}
          type="text"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => past.length > 0 && dispatch(ActionCreators.undo())}
        />
        <Button
          className={classnames(
            future.length > 0
              ? ['opacity-60', 'hover:opacity-100']
              : ['opacity-20'],
          )}
          type="text"
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => future.length > 0 && dispatch(ActionCreators.redo())}
        />

        {timeline.length > 1 && (
          <Button
            type="text"
            shape="circle"
            icon={<HistoryOutlined />}
            onClick={() => setTimelineVisible(!timelineVisisble)}
          />
        )}

        {timelineVisisble && (
          <div className="w-40">
            <Slider
              value={timeline.index + 1}
              min={1}
              max={timeline.length}
              tipFormatter={null}
              onChange={(value: number) => {
                dispatch(ActionCreators.jump(value - timeline.index - 1));
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionBar;
