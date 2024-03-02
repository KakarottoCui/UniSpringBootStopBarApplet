<template>
	<view style="padding: 20rpx;">
		
		<view style="display: flex;flex-direction: row; justify-content: flex-end;width: 100%;padding: 20rpx;">
			<u-button size="mini" @click="getOrderItem" type="primary">预约单</u-button>
		</view>
		<view v-if="!show">
			<view class="item-view" v-for="(item,index) in allOrder">
				<view class="order">
					<view>单号：{{item.id}}</view>
					<view>{{item.park.name}}</view>
					<view>{{stateNameArr[item.state]}}</view>
				</view>
				<view class="order">
					<view>{{item.item.itemName}}</view>
					<view>免费期:{{item.park.freeTime}}分钟</view>
					<view>费率:{{item.park.price}}元/分钟</view>
				</view>
				<view class="order">
					<view>停车:{{countTime(item)}}分钟</view>
					
					<view>总价:{{item.price||0}}元</view>
				</view>
				<view class="order">
					<view>车牌:{{item.carNo}}</view>
					<view>入场:{{item.beginTime}}</view>
				</view>
				<view class="order">
					<view>离场:{{item.endTime||"未离场"}}</view>
				</view>
			</view>
		</view>
		
		<view v-if="show" class="item-view" style="position: fixed;top: 20rpx;left:20rpx;width: 710rpx;height: auto;">
			
			<view @click="showOr" style="color: red;text-align: right;padding: 15rpx;">关闭</view>
			<view class="item-view" v-for="(item,index) in allOrderItem">
				<view class="order">
					<view>ID：{{item.id}}</view>
					<view>{{item.parkName}}</view>
				</view>
				<view class="order">
					<view>{{item.itemName}}</view>
					<view>{{item.orderTime}}</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js"
	
	export default {
		data() {
			return {
				show:false,
				allOrder:[],
				userInfo:"",
				stateNameArr:['已下单','已离场','已取消'],
				current: 0,
				allOrderItem:[]
			};
		},onShow:function(){
			let user = appRequest.getUserInfo();
			if(!user.uid){
				uni.clearStorage()
				this.userInfo=false;
				uni.showModal({
					title:"信息",
					content:"登录后访问",
					showCancel:false,
					success:function(){
						
					}
				})
			}else{
				this.userInfo = user;
				this.getOrder();
			}
		},
		onLoad:function(){
			let user = appRequest.getUserInfo();
			if(!user.uid){
				uni.clearStorage()
				this.userInfo=false;
			}else{
				this.userInfo = user;
			}
			
		},methods:{
			showOr(){
				this.show = false;
			},
			getOrderItem(){
				
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findNmCarParkBookingList,
					data:{
						validFlag:1,
						creater:this.userInfo.uid},
					success: function(res) {
						_this.allOrderItem = res.data.data;
						if(_this.allOrderItem.length == 0){
							uni.showModal({
								title:"信息",
								content:"暂无预约",
								showCancel:false,
								success:function(){
									
								}
							})
						}else{
							_this.show = true;
						}
					},
					fail: function(res) {
						
						uni.showToast({
							title:"网络异常",
							icon:"none"
						})
						
					}
				})
			},
			countTime(row){
			  let begin = new Date(row.beginTime).getTime();
			  let end = row.endTime ? new Date(row.endTime).getTime() : new Date().getTime();
				let diff = end - begin;
				return (diff/(1000*60)).toFixed(2);
			},
			getOrder(){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findNmCarParkOrderList,
					data:{
						validFlag:1,
						creater:this.userInfo.uid},
					success: function(res) {
						_this.allOrder = res.data.data;
						if(_this.allOrder.length == 0){
							uni.showModal({
								title:"信息",
								content:"暂无订单",
								showCancel:false,
								success:function(){
									
								}
							})
						}
					},
					fail: function(res) {
						
						uni.showToast({
							title:"网络异常",
							icon:"none"
						})
						
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.order{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.item-view {
		padding: 30rpx;
		border-radius: 15px;
		box-shadow: 3px 3px 20px lightgray;
		font-size: 30rpx;
	}
</style>
