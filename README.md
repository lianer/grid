# Grid

## 设计

物料管理

1. 物料 ComponentSchema/InstanceSchema
   1. ComponentSchema/InstanceSchema 基本相同，区别在于 InstanceSchema 多了 iid 字段
   2. 包含 base、control、attrs、iid（可选）、stage（可选）、onCompUpdate（可选） 等字段
   3. 其中 base 包含 cid、name、icon、category 等字段，用于描述物料的基本信息，如用于侧边栏展示
   4. 其中 control 包含 type、left、top、width、height 等字段，用于描述操作组件的信息，用于操作组件的基本运作，不同的操作组件有不同的 ControlSchema 定义，需要按照 ControlSchema 类型约束进行基础属性的配置
   5. 其中 attrs 物料的属性，用于编辑表单和舞台中渲染，用于组件自身使用
   6. 其中 iid 只有在物料实例化之后才会有
   7. 其中 stage、onCompUpdate 只有实例在舞台中渲染才会有（这里注意并不是根据 grid、comp 开发模式区分的，而是根据组件是否在 stage 中渲染来区分的）
2. 物料属性 attrs
   1. 物料属性都需要通过 AttrUtils 中的函数进行属性构建，编辑表单也会根据 Attrs 属性的配置信息进行渲染
   2. 其中，无需渲染编辑表单的 Attrs，使用 $ 开头的命名方式，并且无需通过 AttrUtils 构建属性
3. 物料类别 ComponentCategory
   1. 手动在代码中维护 ComponentCategory，后期通过平台创建 ComponentCategory，并在 ComponentCategory 下创建物料，然后再上传物料资源包，自动解析物料资源包中的导出的 schema
4. 物料侧边栏
   1. 通过点击、拖拽添加物料到舞台
   2. 根据 ComponentCategory 区分多标签
   3. 支持分页
5. 物料加载器 loader
   1. 根据 source 地址加载物料，如果已经加载过的，则直接返回结果
6. 流程：Grid 加载 -> 根据物料区激活的 Tab 加载对应的物料 Schema 列表 -> 通过点击、拖拽添加物料到舞台中 -> 通过 loader 加载 source （构造函数） -> 通过构造函数创建物料实例 -> 添加物料实例到舞台中

舞台

1. 舞台 Stage
   1. 包含 width、height、scale、left、top、children 等
   2. width、height、scale、left、top 等是舞台自身的基本属性
   3. children 是已经添加到舞台的物料实例列表，通过 stage.add(ComponentSchema) 添加物料
2. 添加实例 add(ComponentSchema)
   1. 向舞台中添加物料，并通过物料类使用 ComponentSchema 创建物料实例，数据结构转变为 InstanceSchema

编辑表单

TS 类型定义

1. `BaseSchema` - 组件基础描述信息
   1. `BaseSchema` 拥有 cid、name、icon、category 等属性，用于描述组件的基本信息，常用于信息展示（比如侧边栏组件列表）
2. `ControlSchema` - 操作组件描述信息
   1. `BasicControlSchema/AutoHeightControlSchema...`
   2. 不同的操作组件有不同的描述信息定义，比如一个 `Image` 组件如果定义了使用 `AutoHeightControlSchema` 操作组件，那该组件定义的 `ComponentSchema` 中就必须要提供 `AutoHeightControlSchema` 所需的参数
3. `AttrsSchema` - 组件属性描述信息
   1. 组件可以将自己需要开放编辑的属性，放到 `AttrsSchema` 中定义
   2. 通过 `AttrUtils` 类对 `AttrsSchema` 进行定义，生成标准化的属性参数
4. 开发 Grid 时
   1. `ComponentSchema` - 组件描述信息（由 BaseSchema、ControlSchema、AttrsSchema 组成）
      1. `TextSchema/ImageSchema...`
      2. 在组件开发过程中，都是使用 `ComponentSchema` 进行类型推导，只有在 `Stage` 模式下，才使用 `DefineSchema` 进行类型推导
   2. `InstanceSchema` - 组件实例描述信息，在 `ComponentSchema` 的基础上增加了 `iid` 字段
5. 开发 Comp 时
   1. `DefineSchema<C, P>` - 渐进性类型推导描述信息
      1. `DefineSchema<any, any>` - 表示只有 BaseSchema 是明确的，等同于 BaseSchema，ControlSchema 和 AttrsSchema 部分都是未知的 any 类型（当一个组件被 import() 动态导入的时候，它属于这一类情况）
      2. `DefineSchema<ControlSchema, any>` - 表示在明确了 Control 类型后，推断出来的类型（具体逻辑在 `Control.tsx` 中）
      3. `DefineSchema<ControlSchema, AttrsSchema>` - 表示明确了 ControlSchema 和 AttrsSchema 后推导出来的类型

类型分析

1. 开发 Comp 时
   1. BaseSchema、ControlSchema、AttrsSchema 都是可确定的，BaseSchema 还会额外提供 stage、onAttrsUpdate 两个可选的字段
2. 开发 Grid 时
   1. 只有 BaseSchema 是可以确定的
   2. ControlSchema 可以通过 control.type 推断出来
   3. AttrsSchema 无法推断，也无需推断
   4. 因此在 Stage 模式下，组件只需要区分是否实例化就可以了，用 ComponentSchema/InstanceSchema 区分
