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

TS 类型定义

1. `ComponentSchema` - 组件描述信息（由 BaseSchema、ControlSchema、AttrsSchema 组成）
   1. `TextSchema/ImageSchema...`
   2. 在组件开发过程中，都是使用 `ComponentSchema` 进行类型推导，只有在 `Stage` 模式下，才使用 `DefineSchema` 进行类型推导
2. `BaseSchema` - 组件基础描述信息
   1. `BaseSchema` 拥有 cid、name、icon、category 等属性，用于描述组件的基本信息，常用于信息展示（比如侧边栏组件列表）
3. `ControlSchema` - 操作组件描述信息
   1. `BasicControlSchema/AutoHeightControlSchema...`
   2. 不同的操作组件有不同的描述信息定义，比如一个 `Image` 组件如果定义了使用 `AutoHeightControlSchema` 操作组件，那该组件定义的 `ComponentSchema` 中就必须要提供 `AutoHeightControlSchema` 所需的参数
4. `AttrsSchema` - 组件属性描述信息
   1. 组件可以将自己需要开放编辑的属性，放到 `AttrsSchema` 中定义
   2. 通过 `AttrUtils` 类对 `AttrsSchema` 进行定义，生成标准化的属性参数
5. `DefineSchema<C, P>` - 渐进性类型推导描述信息
   1. `DefineSchema<any, any>` - 表示只有 BaseSchema 是明确的，等同于 BaseSchema，ControlSchema 和 AttrsSchema 部分都是未知的 any 类型（当一个组件被 import() 动态导入的时候，它属于这一类情况）
   2. `DefineSchema<ControlSchema, any>` - 表示在明确了 Control 类型后，推断出来的类型（具体逻辑在 `Control.tsx` 中）
   3. `DefineSchema<ControlSchema, AttrsSchema>` - 表示明确了 ControlSchema 和 AttrsSchema 后推导出来的类型
6. 舞台实例 InstanceSchema，在 DefineSchema 的基础上，增加了 iid，用以标识组件实例的唯一性

类型分析

1. 在组件开发模式下
   1. BaseSchema、ControlSchema、AttrsSchema 都是可确定的，BaseSchema 还会额外提供 stage、onAttrsUpdate 两个可选的参数
2. 在 Stage 编辑模式下
   1. 只有 BaseSchema 是可以确定的
   2. ControlSchema 可以通过 control.type 推断出来
   3. AttrsSchema 无法推断，也无需推断
   4. 因此在 Stage 模式下，组件只需要区分是否实例化就可以了，用 ComponentSchema/InstanceSchema 区分
