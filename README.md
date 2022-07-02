# Grid

## 设计

物料管理

1. 物料 Schema
   1. 包含 id、name、icon、category、attrs、source
   2. id 物料的唯一标识
   3. name、icon、category 物料的基本信息，用于侧边栏展示
   4. attrs 物料的属性，用于编辑表单和舞台中渲染
   5. source 物料的资源地址
2. 物料属性 attrs
   1. 以 $ 开头的属性表示私有属性，不出现在右侧编辑表单中，比如 $visible、$left、$top、$width、$height 等
   2. 以非 $ 开头的属性，都需要通过 Attrs 中的函数进行属性构建，编辑表单也会根据 Attrs 属性的配置信息进行渲染
3. 物料类别 Category
   1. 手动在代码中维护 Category，后期通过平台创建 Category，并在 Category 下创建物料，然后再上传物料资源包，自动解析物料资源包中的导出的 schema
4. 物料侧边栏
   1. 通过点击、拖拽添加物料到舞台
   2. 根据 Category 区分多标签
   3. 支持分页
5. 物料加载器 loader
   1. 根据 source 地址加载物料，如果已经加载过的，则直接返回结果
6. 流程：Grid 加载 -> 根据物料区激活的 Tab 加载对应的物料 Schema 列表 -> 通过点击、拖拽添加物料到舞台中 -> 通过 loader 加载 source （构造函数） -> 通过构造函数创建物料实例 -> 添加物料实例到舞台中

舞台

1. 舞台 Stage
   1. 包含 width、height、scale、left、top、children
   2. width、height、scale、left、top 是舞台自身的基本属性
   3. children 是已经添加到舞台的物料实例列表，通过 stage.add(Schema) 添加物料
2. Stage.prototype.add(Schema)
   1. 向舞台中添加物料，并通过物料类使用 Schema 创建物料实例
3. 物料类 Material
   1. 物料类的基本属性都继承自物料 Schema，并扩展一些自身的属性
   2. 继承自物料 Schema 的属性有：name、icon、category、attrs
   3. 扩展的属性有：$left、$top、$width、$height 等

编辑表单

类型

2. 操作组件 BasicControlSchema/AutoHeightControlSchema...
3. 组件定义 TextSchema/ImageSchema...
4. 基础信息 BaseSchema
5. 用于描述未知属性的类型 DefineSchema，可以进一步定义 Schema，使得在具体的场景下拥有更加准确的类型推导
6. 舞台实例 InstanceSchema，在 DefineSchema 的基础上，增加了 iid，用以标识组件实例的唯一性
