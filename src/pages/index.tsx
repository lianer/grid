import SidebarLeft from '@/components/SidebarLeft';
import { Layout } from 'antd';
import s from './index.less';

const { Header, Sider, Content } = Layout;

const HomePage: React.FC = () => {
  return (
    <>
      <Layout className={s.App}>
        <Header className={s.Header}>
          <h1>Grid</h1>
        </Header>
        <Layout>
          <Sider width={400}>
            <SidebarLeft />
          </Sider>
          <Content>Stage</Content>
          <Sider width={400}>Sider</Sider>
        </Layout>
      </Layout>
    </>
  );
};

export default HomePage;
