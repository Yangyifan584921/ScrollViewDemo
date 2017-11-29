# ScrollViewDemo
##### 使用方法
- 安装npm包
```
npm install
```
- 打开项目，并运行
```
react-native run-ios
```
##### 知识点
- 是一个课滚动的容器，可以再其中放入多个组件和视图，不仅可以数值滚动，也可以水平滚动
> 方法：
> - onMomentumScrollBegin:函数->当视图滚动时
> - onMomentumScrollEnd:函数->当视图停止滚动时

> 常用属性：

属性 | 作用
---|---
showsHorizontalScrollIndicator | 控制是否显示水平方向的滚动条
showsVerticalScrollIndicator | 控制是否显示垂直方向的滚动条
scrollEnabled | 控制控件是否能滚动
contentOffSet | 监控目前滚动的位置
 bounces|控制控件遇到边框是否反弹
 pagingEnabled | 控制控件是否整页翻动
 horizontal | 为true时水平滚动，为false时数值滚动


