# 辅助线

## 功能

1. 当元素拖拽时，给予水平方向或垂直方向对齐的元素显示辅助线
2. 当元素拖拽时，给予水平方向或垂直方向上间距相同的元素显示辅助线

## 设计

1. 给定一个容器，观察容器的所有子元素，或提供一个数组，观察数组中的所有元素，或提供一个 selector 表达式，观察符合表达式的所有元素，数组记为 elements
2. 开始拖拽元素时，通过 el.getBoundingClientRect 获得每个元素的位置信息，记为 boundingRects，拖拽元素时，获取拖拽元素的 boundingRect 信息，并到 boundingRects 中查找与之关联的元素
3. 对齐检测
   1. 拖拽元素时，如果有水平方向上的元素，它们的上边框或下边框位置相同，则显示上边框或下边框对齐线，如果有多个符合条件的，则永远找最左边和最右边的那个进行参考线的绘制
   2. 拖拽元素时，如果有垂直方向上的元素，它们的左边框或右边框位置相同，则显示左边框或右边框对齐线，如果有多个符合条件的，则永远找最上边和最下边的那个进行参考下的绘制
   3. 拖拽元素时，如果水平方向或垂直方向上有交叉方向非常接近的元素（比如相聚 1px）则使被拖拽元素自动吸附
   4. 拖拽元素时，如果被拖拽元素中心点与舞台对齐，则显示辅助线
4. 间距检测
   1. 拖拽元素时，记元素为 target
   2. 分别查找上边框或下边框处于同一水平面的元素，记为 topElements 和 bottomElements
   3. 在 topElements 和 bottomElements 中分别查找与拖拽元素左侧和右侧的元素，记为 leftElements 和 rightElements
   4. 分别从 leftElements 和 rightElements 中查找距离拖拽元素距离最近的元素，它们的距离记为 marginLeft 和 marginRight
   5. 如果 [leftElements, target] 中的元素两两之间的间距等于 marginLeft，则高亮显示辅助线
   6. 如果 [target, rightElements] 中的元素两两之间的距离等于 marginRight，则高亮显示辅助线
