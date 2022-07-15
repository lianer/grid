import classNames from 'classnames';

type IconButtonProps = {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
};

// 图标按钮组件，常用于字体加粗、斜体等图标按钮
const IconButton: React.FC<IconButtonProps> = function (props) {
  const { active = false, children, onClick } = props;
  return (
    <div
      className={classNames(
        'flex flex-row justify-center items-center inline-block w-6 h-6',
        'text-sm select-none rounded-md cursor-pointer',
        {
          'hover:bg-gray-100': !active,
          'bg-gray-200': active,
        },
      )}
      style={{
        transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconButton;
