import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFuture, selectPast } from '@/store/stageSlice';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ActionCreators } from 'redux-undo';

const ActionBar: React.FC = function () {
  const dispatch = useAppDispatch();

  const past = useAppSelector(selectPast);
  const future = useAppSelector(selectFuture);

  return (
    <div
      className="ActionBar flex flex-row items-center h-16 px-4 overflow-hidden text-2xl border-b bg-white rounded-t-xl"
      style={{ boxShadow: '0 -3px 3px rgba(0, 0, 0, 0.03)' }}
    >
      <h1 className="GridTitle w-80 mb-0">Grid</h1>
      <div className="Actions flex flex-row items-center gap-2">
        <Button
          className={
            past.length > 0 ? 'opacity-60 hover:opacity-100' : 'opacity-20'
          }
          type="text"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => past.length > 0 && dispatch(ActionCreators.undo())}
        />
        <Button
          className={
            future.length > 0 ? 'opacity-60 hover:opacity-100' : 'opacity-20'
          }
          type="text"
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => future.length > 0 && dispatch(ActionCreators.redo())}
        />
      </div>
    </div>
  );
};

export default ActionBar;
