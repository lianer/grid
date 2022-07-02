import image from '@/materials/image';
import text from '@/materials/text';
import { ComponentType, lazy, LazyExoticComponent } from 'react';

const components = {
  // 1: text.Component,
  // 2: image.Component,
  1: lazy(() => import('@/materials/text/Component')),
  2: lazy(() => import('@/materials/image/Component')),
};
const schemaList = [text.schema, image.schema];

export const getBasicList = () => {
  return JSON.parse(JSON.stringify(schemaList));
};

export const getChartList = () => {
  return [];
};

export const getMapList = () => {
  return [];
};

export const loadById = ($cid: number) => {
  const lazyComponent = components[$cid as keyof typeof components];
  if (!lazyComponent) {
    throw new Error(`resource not found: ${$cid}`);
  }
  // 这个文件模拟了网络请求加载 component 的过程
  // 组件是从网络加载的，因此这里重置 ts 的静态类型推导
  return lazyComponent as LazyExoticComponent<ComponentType<any>>;
};
