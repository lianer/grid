import ActionBar from './ActionBar';
import MenuBar from './MenuBar';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import Stage from './Stage';

const HomePage: React.FC = function () {
  return (
    <>
      <main className="flex flex-col w-screen h-screen select-none">
        <header className="w-full" style={{ backgroundColor: '#dbfcd7' }}>
          <MenuBar />
          <ActionBar />
        </header>
        <main className="flex flex-1 flex-row overflow-hidden">
          <aside className="w-80 h-full border-r">
            <SidebarLeft />
          </aside>
          <main className="flex-1 h-full overflow-hidden bg-gray-50">
            <Stage />
          </main>
          <aside className="w-80 h-full border-l">
            <SidebarRight />
          </aside>
        </main>
      </main>
    </>
  );
};

export default HomePage;
