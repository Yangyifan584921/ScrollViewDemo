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
				"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494233305839&di=e1647289d1fcd778f64ddf3ccaf6fcfa&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1016%2Fgha%2F1%2F1350006791532.jpg",
				"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494232883125&di=c8234065f7872532308c5396e0fcd3b8&imgtype=0&src=http%3A%2F%2Fimg1.91.com%2Fuploads%2Fallimg%2F130514%2F32-1305141I359.jpg",
				"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494236734637&di=bb81b0fa9b2040542a4a6f9fcc2d0359&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1016%2Fgha%2F1%2F1350006753179.jpg",
				"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494236802350&di=72da30f79403ec28b124424f2c24a9f6&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2014%2Flxy%2F2014%2F09%2F16%2F8.jpg"
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








