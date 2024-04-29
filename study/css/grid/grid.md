# Grid

[TOC]

## 一，概述

**Flex**布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。**Grid**布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局

## 二，基本概念

### 2.1 容器、项目

*容器*网格布局的区域，*项目*容器内部采用网格定位的子元素

### 2.2 行、列

水平区域-行、垂直区域-列

### 2.3 单元格

行列交叉区域（网格线之间区域），为单元格-cell；**n**行**m**列产生**n\*m**个单元格；3\*3 产生 9 个单元格

![alt text](1_bg2019032503.png)

### 2.4 网格线

划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列。
*n*行划分出*n+1*根水平网格线

## 三, 容器属性

Grid 布局的属性分成**容器属性**、**项目属性**

### 3.1，display

```
display: grid           // 指定容器布局
display: inline-grid;   // 指定容器为行内元素&网格
```

### 3.2，grid-template-columns、grid-template-rows

定义**行列的数量及宽高**，可使用百分比

```
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px; // 每列宽度x，3列
  grid-template-rows: 100px 100px 100px;    // 每行高度x，3行
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

### 3.2.1 repeat()

```
    grid-template-columns: repeat(2, 100px 20px 80px); // 重复某种模式  每3列，循环两次
```

### 3.2.2 auto-fill 关键字

```
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px); // 自动填充
}
```

> auto-fit 自动扩大单元格宽度，类似于 auto-fill

### 3.2.3 fr 关键字

fraction-片段，表示比例关系。如果两列的宽度分别为 1fr 和 2fr，就表示后者是前者的两倍

```
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-columns: 150px 1fr 2fr; // 结合固定长度单位，容易计算出某个值
}
```

### 3.2.4 minmax() 生成长度范围

```
grid-template-columns: 1fr 1fr minmax(100px, 1fr); // 最小100，最大不超过1fr
```

### 3.2.5 auto 关键字

```
grid-template-columns:  100px auto 100px;
```

### 3.2.6 网格线的名称

> 这是网格线的名称，这是网格线的名称，这是网格线的名称

网格线排序还能反向编号排序，例如从左至右为 1,2,3,4 反向排序为-4，-3，-2，-1

```
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```

### 3.9 grid-row-gap、grid-column-gap、grid-gap 属性

```
.container {
  grid-row-gap: 20px;  // 行间距  new:row-gap
  grid-column-gap: 20px; // 列间距  new:column-gap
  grid-gap: <grid-row-gap> <grid-column-gap>;   // 简写 new:gap,两个值相同可以合并成一个
}
```

### 3.10 grid-template-areas

指定‘区域’，由 n 个单元格构成

```
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';

  grid-template-areas: 'a a a'
                        'b b b'
                        'c c c';  // 合并写法？？
}
```

> 某些区域不需要，用(.)表示；‘区域’命名会影响网格线，自动命名成 **‘元素名’-start**，**‘元素名’-end**。

### 3.11 grid-auto-flow 属性

决定网格内子元素的排序。row，‘先行后列’；colum，‘先列后行’；默认 row

```
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
<div>7</div>

x{
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-flow: column;
}

1 4 7
2 5
3 6
```

除了*row*与*column*,还有**row dense**、**column dense**，当指定了某些项之后，剩下的项是否需要尽可能的补齐留白。意味着*指定规则>剩余规则*

### 3.12 justify-items、align-items、place-items 属性

对**容器**使用，类似于 flex 规则。 - 容器内的所有单元格，在网格中的表现
`stretch` 拉伸，默认值，占满单元格宽度

```
.container {
  justify-items: start | end | center | stretch; // 水平位置
  align-items: start | end | center | stretch; // 垂直位置
  place-items: <align-items> <justify-items>; // 上述的合写，忽略第二个值，则与第一个相同
}
```

### 3.13 justify-content、align-content、place-content 属性

对**容器**使用，决定容器内的单元格在容器中的位置，类似于 Flex。

- `space-around` 每个项目两侧间隔相加后相等(项目之间的间隔比项目与容器边框的间隔大一倍) .例：left-项目-right left-项目-right。 around-环绕
- `space-between` 项与项之间的间隔相等(项目与容器边框之间没有间隔)。例：间隔-项目-间隔-项目-间隔。between-在 x 之间
- `space-evenly` 项与项之间间隔相等（项目与容器之间也是同样长度的间隔）。 evenly-均匀

```
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```

`place-content` 为`align-content`和`justify-content`的合写
想·

```
place-content: <align-content> <justify-content>; // 忽略第二个值，则视为与第一个值相同
```

### 3.14 grid-auto-columns、grid-auto-rows 属性

有的时候，需要指定一些单元格在现有网格的外部（调皮的孩子），这个时候浏览器会自动生成多余的网格以便放置项目

而`grid-auto-columns`、`grid-auto-rows`就是来设置那些特殊单元格**所在的行高列宽**。写法与`grid-template-columns`、`grid-template-rows`完全一致

```
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-rows: 50px;  // 指定调皮孩子所在的行高
}

// 调皮孩子
.item-x{
  grid-row-start: 4; // 它在占据第几行 end表示在第几行结束
  grid-column-start: 2; // 所占据的第几列
}
```

### 3.15 grid-template、grid 属性

- `grid-template` 是`grid-template-columns`、`grid-template-rows`和`grid-template-areas`的合写

- `grid` 是`grid-template-rows`、`grid-template-columns`和`grid-template-areas`、`grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`的合写

## 四，项目属性

### 4.1 grid-column-start、grid-column-end、grid-row-start、grid-row-end 属性

用于指定项目定位在哪根网格线

- grid-column-start 属性：左边框所在的垂直网格线
- grid-column-end 属性：右边框所在的垂直网格线
- grid-row-start 属性：上边框所在的水平网格线
- grid-row-end 属性：下边框所在的水平网格线

也能指定网格线名称；**span**关键词表示‘跨越’，即左右边框（上下边框）之间跨越多少个网格。使用`z-index`解决重叠顺序问题。

```
  grid-column-start: header-start;
  grid-column-end: header-end;

  grid-column-start: span 2; // 横跨2列
  grid-column-end: span 2; // 等同上面的效果
```

### 4.2 grid-column、grid-row 属性

- `grid-column`属性是`grid-column-start`和`grid-column-end`的简写
- `grid-row`属性是`grid-row-start`和`grid-row-end`的简写

```
.item {
  grid-column: <start-line> / <end-line>;
  grid-row: <start-line> / <end-line>;  // 无参数二，则视为同参数一  1，默认跨一个网格
}
```

### 4.3 grid-area 属性

`grid-area`属性指定项目的区域，类似于定位;同时，它也是`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的简写

```
.item-1 {
  grid-area: e; // item-1 则位于e区
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;  // 简写，例：grid-area: 1 / 1 / 3 / 3;
}
```

### 4.4 justify-self、align-self、place-self 属性

例如，容器内的所有项目表现为【在网格中位于 center 位置】，单独给【某个坏孩子项目设置 start】，它则独自位于 start；默认 stretch，拉伸至整个单元格宽度

- `justify-self` 设置单元格内容的水平位置（左中右） 同`justify-items`,仅作用于单个项目
- `align-self` 设置单元格内容的垂直位置（上中下） 同`align-items`,仅作用于单个项目
- `place-self` 以上属性的合并简写

```
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
  place-self: <align-self> <justify-self>; // 合并简写。无参数二，则视为同参数一
}
```

## 五，实战举例

https://zhuanlan.zhihu.com/p/354671197
https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html 阮一峰
https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/
