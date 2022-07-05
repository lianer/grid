import SidebarLeft from '@/components/SidebarLeft';
import Sidebarright from '@/components/Sidebarright';
import Stage from '@/components/Stage';
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

const ActionBar: React.FC = function () {
  return (
    <div
      className="flex flex-row items-center h-16 px-4 text-2xl border-b bg-white rounded-t-xl"
      style={{ boxShadow: '0 -3px 3px rgba(0, 0, 0, 0.03)' }}
    >
      <h1>Grid</h1>
    </div>
  );
};

const HomePage: React.FC = function () {
  return (
    <>
      <main className="flex flex-col w-screen h-screen select-none">
        <header className="w-full h-24" style={{ backgroundColor: '#dbfcd7' }}>
          <MenuBar />
          <ActionBar />
        </header>
        <main className="flex flex-row h-full">
          <aside className="w-80 h-full border-r">
            <SidebarLeft />
          </aside>
          <main className="flex-1 h-full bg-gray-50">
            <Stage />
          </main>
          <aside className="w-80 h-full border-l">
            <Sidebarright />
          </aside>
        </main>
      </main>
    </>
  );
};

export default HomePage;
