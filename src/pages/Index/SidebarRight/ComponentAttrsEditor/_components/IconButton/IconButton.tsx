import { Tooltip } from 'antd';
import classNames from 'classnames';

type IconButtonProps = {
  active?: boolean;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
};

// 图标按钮组件，常用于字体加粗、斜体等图标按钮
const IconButton: React.FC<IconButtonProps> = function (props) {
  const { active = false, title, children, onClick } = props;
  return (
    <Tooltip title={title} mouseEnterDelay={0.5} color={'#666'}>
      <div
        className={classNames(
          'flex flex-row justify-center items-center inline-block w-6 h-6',
          'text-sm select-none rounded cursor-pointer',
          {
            'hover:bg-gray-200': !active,
            'bg-gray-300': active,
          },
        )}
        style={{
          transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
        }}
        onClick={onClick}
      >
        {children}
      </div>
    </Tooltip>
  );
};

export default IconButton;
