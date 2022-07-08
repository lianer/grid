import '@/styles/append-antd.less';
import { Provider } from 'react-redux';

import { Outlet } from 'umi';
import { store } from '../store/store';

export default function Layout() {
  return (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </>
  );
}
