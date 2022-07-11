import { Link } from 'umi';

const MenuBar: React.FC = function () {
  return (
    <div className="flex flex-row items-center h-8 px-4 gap-4">
      <Link to="">Home</Link>
      <Link to="/about">About</Link>
      <Link to="">Util</Link>
      <Link to="">Help</Link>
    </div>
  );
};
export default MenuBar;
