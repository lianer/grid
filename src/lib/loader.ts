import { ComponentCategory, ComponentSchema } from '@/types';
import { ComponentType, lazy, LazyExoticComponent } from 'react';

const materials: any[] = [
  () => import('@/_materials/text/schema'),
  () => import('@/_materials/image/schema'),
  () => import('@/_materials/carousel/schema'),
  () => import('@/_materials/button/schema'),
];

const components: Record<number, any> = {
  1: lazy(() => import('@/_materials/text/Component')),
  2: lazy(() => import('@/_materials/image/Component')),
  3: lazy(() => import('@/_materials/carousel/Component')),
  4: lazy(() => import('@/_materials/button/Component')),
};

export const getMaterialList = async (category: ComponentCategory) => {
  const modules = await Promise.all(materials.map((load) => load()));
  const cids = new Set<number>();
  const schemaList: ComponentSchema[] = [];

  modules.forEach(({ default: schema }, index) => {
    if (cids.has(schema.base.cid)) {
      console.error(
        `[Grid] loader: 物料 %o 出现重复的 cid ${schema.base.cid}，该物料已被忽略`,
        schema,
      );
      return;
    }

    cids.add(schema.base.cid);
    schemaList.push(schema);
  });

  return JSON.parse(JSON.stringify(schemaList));
};

export const loadById = (cid: number) => {
  const load = components[cid];

  if (!load) {
    throw new Error(`[Grid] loader: 资源文件未找到 cid ${cid}`);
  }

  // 这个文件模拟了网络请求加载 component 的过程
  // 组件是从网络加载的，因此这里重置 ts 的静态类型推导
  return load as LazyExoticComponent<ComponentType<any>>;
};
