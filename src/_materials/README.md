# Materials

物料 Materials/Components

1. 物料也称组件，站在业务角度称为物料更为合适，站在开发角度称为组件更为合适
2. 物料将会抽离到单独的仓库进行维护，与 Grid 本体分离
3. 物料计划通过 Grid Center 进行管理，配合 OSS、COS 等对象存储，实现物料的发布、部署、更新、访问的完整生命周期

规范

1. TS 类型定义，物料只能引入 `types/types-mode-comp.ts` 文件中定义的类型，不能引入其他类型定义
2. 物料中的 `ComponentSchema` 与 Grid 中的 `ComponentSchema` 命名相同，但实际类型不同
   1. 物料中的 `ComponentSchema` 具有更加具体的类型定义
   2. Grid 中的 `ComponentSchema` 只有比较模糊的类型定义，Grid 中物料实例化之后，更多的逻辑还是基于 `InstanceSchema` 的
