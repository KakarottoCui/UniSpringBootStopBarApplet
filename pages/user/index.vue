<template>
	<view>
		<view class="warp_user">
			<view class="top_user_box">
				<image src="/static/coolc/park.png"></image>
				<view class="user_info">
					<view class="username">{{userInfo.nickName}}</view>
					<view class="carNo">{{userInfo.carNo}}</view>
				</view>
			</view>

			<view class="icon_boxs">
				<navigator class="i" hover-class="none" @click="showCarInfo">
					<view class="icon_box">
						<u-icon name="grid-fill" color="#fff" size="32"></u-icon>
					</view>
					<text class="n">车辆信息</text>
				</navigator>
				<navigator class="i" hover-class="none" @click="showUserInfo">
					<view class="icon_box">
						<u-icon name="email-fill" color="#fff" size="32"></u-icon>
					</view>
					<text class="n">个人信息</text>
				</navigator>
			</view>
		</view>
		
		<u-cell-group :border="false">
			<u-cell icon="setting" style="margin: 10rpx 0;" @click="info" :isLink="true" title="应用信息"></u-cell>
			<u-cell icon="chat" style="margin: 10rpx 0;" @click="setFeedBack" :isLink="true" title="留言"></u-cell>
			<u-cell @click="jump" icon="bell" style="margin: 10rpx 0;" :isLink="true" :title="login?'退出登录':'前往登录'"></u-cell>
		</u-cell-group>
		
		
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js"
	export default {
		data() {
			return {
				feed:{
					title:"",
					content:""
				},
				showModal:false,
				userInfo:{
					nickName:"",
					carNo:""
				},
				login:false
			}
		},
		onShow(){
			let info = appRequest.getUserInfo();
			if(!info.uid){
				uni.clearStorage()
				this.userInfo.nickName = "游客"
				this.userInfo.carNo = "登录后查看"
			}else{
				this.userInfo = info;
				this.login = true;
			}
		},
		methods: {
			
			setFeedBack(){
				uni.navigateTo({
					url: "/pages/user/feed/feed"
				});
			},
			navi(url) {
				uni.navigateTo({
					url: url
				});
			},jump(){
				if(this.login){
					this.login = false;
					uni.clearStorage();
					uni.switchTab({
						url:"/pages/site/index"
					})
				}else{
					uni.clearStorage();
					uni.navigateTo({
						url:"/pages/simple/login"
					})
				}
			},info(){
				uni.showModal({
					title:"应用信息",
					content:"智能停车场App，版本0.808",
					showCancel:false
				})
			},showCarInfo(){
				if(this.login){
					uni.showModal({
						title:"车辆信息",
						content:"当前绑定车牌号："+this.userInfo.carNo,
						showCancel:false
					})
				}else{
					uni.showToast({
						title:"请登录后操作",
						icon:"none"
					})
				}
			},showUserInfo(){
				if(this.login){
					uni.navigateTo({
						url:"/pages/user/userInfo"
					})
				}else{
					uni.showToast({
						title:"请登录后操作",
						icon:"none"
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.warp_user {
		width: 750rpx;
		padding: 30rpx;
		background: linear-gradient(180deg, rgba(61, 126, 255, 1) 0%, rgba(61, 126, 255, 1) 30%, rgba(255, 255, 255, 1) 90%);
	}
	
	.top_user_box {
		width: 100%;
		@include flex;
		justify-content: flex-start;
		align-items: center;
		padding-bottom: 30rpx;
		
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			border: 6rpx solid #fff;
		}
		.user_info {
			padding: 24rpx;
			
			.username {
				font-size: 34rpx;
				color: #fff;
				padding-bottom: 10rpx;
			}
			.mobile {
				font-size: 26rpx;
				color: #fff;
			}
		}
	}
	.icon_boxs {
		background: #fff;
		border-radius: 20rpx;
		padding: 60rpx 0 20rpx 0;
		@include flex;
		justify-content: space-between;
		align-items: center;
		
		.i {
			width: 50%;
			text-align: center;
			
			.icon_box {
				width: 86rpx;
				height: 86rpx;
				line-height: 86rpx;
				border-radius: 86rpx;
				background: #9ab6ff;
				@include flex;
				justify-content: center;
				align-items: center;
				margin: 0 auto;
			}
			
			.n {
				padding-top: 20rpx;
				font-size: 24rpx;
				color: #333;
			}
		}
	}
	
	/* 遮罩层 */
		.modal {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 33rpx;
		}
		/* 窗口 */
		.modal-content {
			background-color: white;
			/* padding: 20px; */
			width: 600rpx;
			height: 800rpx;
			border-radius: 8rpx;
			position: relative;
			//modal-content下的第一个view
			view:first-child{
				padding:30rpx;
				font-size:33rpx;
				font-weight:bold;
			}
			//modal-content下的第二个view
			view:nth-child(2){
				padding:40rpx;
				font-size:33rpx;
				color:red
			}
		}
		/* 按钮 */
		.modal-buttons {
			width: 100%;
			display: flex;
			bottom: 0;
			position: absolute;
			font-size:33rpx;
		}
		.modal-buttons button {
			width: 100%;
			border: none;
		}
		.modal-buttons button:first-child {
			background-color: #74bfe7;
			color: #fff;
			border-radius: 0;
		}
		.modal-buttons button:last-child {
			width: 100%;
			border: 2rpx solid #74bfe7;
			border-radius: 0px;
			background-color: #fff;
			color: #74bfe7;
		}
	
</style>
