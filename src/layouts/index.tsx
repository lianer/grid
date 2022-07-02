import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import 'tailwindcss/tailwind.css';
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
