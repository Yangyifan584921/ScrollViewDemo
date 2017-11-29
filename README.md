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
> 与其他列表控件的区别：
>> - ScrollView
> 1. 会把所有的子元素都渲染出来，使用上最简单但是当数据太多时，会影响性能
>> - ListView
> 2. 更适用于长列表，不会立即渲染所有的元素，优先渲染屏幕上可见的元素
>> - SectionList
> 3. 高性能的分组列表组件

> 常用的功能
> - 完全跨平台
> - 支持水平布局模式
> - 支持单独的头部组件
> - 支持单独的尾部组件
> - 支持下拉刷新
> - 支持上拉加载

```
<View style={styles.container}>
				<SectionList
				renderSectionHeader={this._renderSectionHeader}
				renderItem={this._renderItem}
				sections={sections}
				refreshing={false}
				onRefresh={()=>{alert('刷新')}}
				SectionSeparatorComponent={()=><View style={{height:20,background:'blue'}}></View>}
				itemSeparatorComponent={this._separatorCom}
				keyExtractor={(item,index)=>{'index'+index+item}}
				
				onEndReachedThreshold={0}
				stickySectionHeaderEnabled={true}
				ListHeaderComponent={()=><View style={{backgroundColor:'yellow',alignItems:'center'}}>
					<Text>SelectionList简易通讯录</Text>
				</View>}
				ListFooterComponent={()=><View style={{backgroundColor:'yellow',alignItems:'center'}}>
					<Text>SelectionList简易通讯录尾部</Text>
				</View>}>
				</SectionList>
			</View>
```
属性 | 作用 
---|---
sections:Array | 数据源，相当于dataSource
keyExtractor(item:itemT,index:number)=>string | 这个函数用于为给定的item生成一个不充分的key。作用为让React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标。
refreshing | 在等待加载新数据时将此属性设置为true，就会显示一个loading符号
onRefresh | 如果设置了这个属性就会在列表头部添加一个RefreshControl的控件，实现下拉刷新的功能，同时设置refreshing
onEndReachedThreShold:number | 决定当距离内容最底部还有多远时触发onEndReached回调。这是一个比值不是一个像素值。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发
onEndReached|当列表被滚动到距离底部不足onEndReachedThreshold的距离时调用
getItem | 获取控件的绑定数据
getItemCount | 获取控件的绑定数据的条数
ListFooterComponent | 尾部组件
ListHeaderComponent | 头部组件
ListEmptyComponent | 列表为空时渲染该组件，可以是一个React Component，也可以是一个render函数，或者是一个渲染好的element 
SectionSrparatorComponent | 每个section之间的分隔组件
ItemSeparatorComponent | 行与行之间的分隔组件，不会出现在第一行之前或最后一行之后
