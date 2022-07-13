import {
  remove,
  selectFuture,
  selectPast,
  selectPresent,
} from '@/store/stageSlice';
import { store } from '@/store/store';
import { isNumber } from 'lodash-es';
import { HotKeys } from 'react-hotkeys';
import { ActionCreators } from 'redux-undo';
import ActionBar from './ActionBar';
import MenuBar from './MenuBar';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import Stage from './Stage';

// TODO: 补充长按方向键移动元素的功能

const keyMap = {
  DELETE: ['del', 'backspace'],
  UNDO: ['command+z'],
  REDO: ['command+shift+z', 'command+y'],
};

const handlers = {
  DELETE: () => {
    const currentActive = selectPresent((state) => {
      return state.currentActive;
    })(store.getState());
    if (isNumber(currentActive)) {
      store.dispatch(remove({ iid: currentActive }));
    }
  },

  UNDO: () => {
    const past = selectPast(store.getState());
    if (past.length > 0) {
      store.dispatch(ActionCreators.undo());
    }
  },

  REDO: () => {
    const future = selectFuture(store.getState());
    if (future.length > 0) {
      store.dispatch(ActionCreators.redo());
    }
  },
};

const HomePage: React.FC = function () {
  return (
    <>
      <HotKeys keyMap={keyMap} handlers={handlers}>
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
      </HotKeys>
    </>
  );
};

export default HomePage;
