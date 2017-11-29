/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform,StyleSheet,Text, View,Image,ScrollView,Dimensions
} from 'react-native';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' +
	'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' +
	'Shake or press menu button for dev menu',
});

export default class reactDemo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			currentIndex:0,
			imgDate:[
				"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1586207542,1126066039&fm=27&gp=0.jpg",
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=382424164,2265057143&fm=27&gp=0.jpg",
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1474506808,2225489807&fm=27&gp=0.jpg",
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1820830892,319341373&fm=27&gp=0.jpg"
			]
			
		};
		this.carousel=this.carousel.bind(this);
		this.dragStart=this.dragStart.bind(this);
		this.dragEnd=this.dragEnd.bind(this);
		this.onAnnotationEnd=this.onAnnotationEnd.bind(this)
	}
	
	componentDidMount(){
		this.carousel();
	}
	
	doClick(index){
		clearInterval(this.carouselTimer);
		this.setState({currentIndex:index},()=>{
			let ScrollView=this.refs.scrollView;
			const currentX=this.state.currentIndex*Dimensions.get('window').width;
			ScrollView.scrollResponderScrollTo({x:currentX,animated:true})
		});
	}
	
	//滑动时清除定时器
	dragStart(){
		clearInterval(this.carouselTimer)
	}
	
	//停止滑动时触发定时器
	dragEnd(){
		this.carousel()
	}
	
	carousel(){
		let ScrollView=this.refs.scrollView;
		const timer=4000;
		let currentIndex=this.state.currentIndex;
		
		this.carouselTimer=setInterval(()=>{
			currentIndex===this.state.imgDate.length-1?currentIndex=0:currentIndex++;
			this.setState({
				currentIndex:currentIndex
			},()=>{
				const currentX=currentIndex*Dimensions.get('window').width;
				ScrollView.scrollResponderScrollTo({x:currentX,animated:true})
			})
		},timer)
	}
	
	onAnnotationEnd(e){
		const offsetX=e.nativeEvent.contentOffset.x;
		const currentIndex=offsetX/Dimensions.get('window').width;
		this.setState({
			currentIndex:currentIndex
		})
	}
	
	render(){
		const {imgDate,currentIndex}=this.state;
		const screenWidth=Dimensions.get('window').width;
		const imgDataList=imgDate.map((ele,index)=>{
			return(
				<Image key={index} style={{width:screenWidth,height:240}} source={{url:ele}}></Image>
			)
		});
		const doList=imgDate.map((ele,index)=>{
			return(
				<Text onPress={this.doClick.bind(this,index)} key={index} style={[styles.dotStyle,{backgroundColor:currentIndex===index?'red':'fff'}]}></Text>
			)
		})
		return(
			<View>
				<Text style={styles.myTitleStyle}>ScrollView轮播图</Text>
				<ScrollView
					ref="scrollView"
					horizontal={true}
					showsHorizontalScrollIndicator={true}
					pagingEnabled={true}
					onScrollBeginDrag={this.dragStart}
					onScrollEndDrag={this.dragEnd}
					onMomentumScrollEnd={this.onAnnotationEnd}
				>
					{imgDataList}
				</ScrollView>
				<View style={styles.dotView}>{doList}</View>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	myTitleStyle:{
		flexDirection:'row',
		fontSize:30,
		color:'#000',
		textAlign:'center',
		paddingTop:12,
		paddingBottom:12,
		marginTop:24,
		marginBottom:24
	},
	dotStyle:{
		width:24,
		height:24,
		borderRadius:12,
		marginRight:10,
	},
	dotView:{
		flexDirection:'row',
		marginLeft:15,
		position:'absolute',
		bottom:10
	}
});








