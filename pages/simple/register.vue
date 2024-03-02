<template>
	<view>
		<view class="warp">
			<view class="name">欢迎注册智能停车场App</view>
			<u-form labelPosition="left" label-width="70" :model="form" ref="uForm">
				<u-form-item prop="nickName" borderBottom label="姓名">
					<u-input v-model="form.nickName" placeholder="请输入姓名"/>
				</u-form-item>
				<u-form-item prop="phone" borderBottom label="手机号">
					<u-input v-model="form.phone" placeholder="请输入手机号"/>
				</u-form-item>
				<u-form-item borderBottom label="车牌号" prop="carNo">
					<u-input v-model="form.carNo" placeholder="请输入车牌号"/>
				</u-form-item>
				<u-form-item label="性别">
					<u-radio-group v-model="form.sex" @change="radioGroupChange">
						<u-radio name="1"></u-radio>男 
						<view style="margin-left: 40rpx;"></view>
						<u-radio name="0"></u-radio>女
					</u-radio-group>
				</u-form-item>

				<u-form-item label="密码" borderBottom>
					<u-input v-model="form.pass" type="password" placeholder="请输入密码"/>
				</u-form-item>
				<u-form-item label="确认密码" borderBottom>
					<u-input v-model="form.pass2" type="password" placeholder="请确认密码"/>
				</u-form-item>
			</u-form>
			<view class="buttonBox">
				<u-button type="primary" text="注册" @tap="sub()"></u-button>
			</view>
		</view>
		
		<!-- <picker @change="radioGroupChange" :value="index" :range="array">
			<view class="uni-input">{{parkInfo[index].name}}({{parkInfo[index].orgName}})</view>
		</picker> -->
		
	</view>
</template>

<script>
	
	import appRequest from "@/common/appRequestUrl.js"
	import base64 from "@/common/base64.js"
	export default {
		data() {
			return {
				array: [],
				index:0,
				parkInfo:[],
				selItem:{},
				form:{
					phone:"",
					nickName:"",
					sex:"1",
					carNo:"",
					pass:"",
					pass2:""
				},
				show:true
			};
		},
		onLoad(){
			
		},
		methods:{
			radioGroupChange(e){
				this.form.sex = e;
			},
			sub(){
				let _this = this;
				
				if(_this.form.nickName ==""){
					uni.showToast({
						title:"请填写完整",
						icon:"none"
					})
					
					return;
				}
				
				if( !_this.$u.test.mobile(_this.form.phone) ){
					uni.showToast({
						title:"请填写正确的手机号格式",
						icon:"none"
					})
					return;
				}
				
				if( !_this.$u.test.carNo(_this.form.carNo) ){
					uni.showToast({
						title:"请填写正确的车牌号格式",
						icon:"none"
					})
					return;
				}
				
				if(_this.form.pass.length<6  || _this.form.pass2.length<6 || _this.form.pass!=_this.form.pass2 ){
					
					uni.showToast({
						title:"请输入两次密码并保持一致，密码至少6位数",
						icon:"none"
					})
					
					return;
				}
				
				let base64en = new base64()
				this.form.password = base64en.encode(this.form.pass);
				this.form.pass2 = "";
				appRequest.request({
					method: "POST",
					data: _this.form,
					url: appRequest.urlMap.register,
					success: function(res) {
						if(res.data.code == 200){
							uni.showModal({
								title:"信息",
								content:"注册成功，前往登录。",
								showCancel:false,
								success:function(){
									uni.reLaunch({
										url:"/pages/simple/login"
									})
								}
							})
						}else{
							uni.showModal({
								title:"信息",
								content:res.data.msg,
								showCancel:false,
								success:function(){
									
								}
							})
						}
						
					},
					fail: function(res) {
						console.log(res)
						_this.$api.msg("请求异常");
						// _this.logining = false;
						// _this.data.pass = "";
					}
				})
				
			},
			changeCar(e){
				this.form.plateNumber = e;
			},
			getParkInfo(){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.getInfo,
					success: function(res) {
						_this.parkInfo = res.data;
						if(_this.parkInfo && typeof(_this.parkInfo) == 'object'){
							_this.parkInfo.map(function(item,index){
								_this.array.push(item.name+"("+item.orgName+")")
							})
							
							let info = _this.parkInfo[_this.index];
							_this.form.orgId = info.orgId;
							_this.form.orgName = info.orgName;
							_this.form.parkManageId = info.id;
							_this.form.parkManageName = info.name;
							
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
		},onReady() {
			
		}
	}
</script>

<style lang="scss">
	.warp {
		width: 750rpx;
		padding: 160rpx 70rpx 30rpx 70rpx;
		background: #fff;
		
		.name {
			width: 100%;
			text-align: center;
			font-size: 38rpx;
			color: #3366FF;
			padding-bottom: 80rpx;
		}
		
		.u-form-item {
			padding-bottom: 50rpx;
		}
		
		.buttonBox {
			width: 100%;
			padding-top: 30rpx;
			
			.u-button {
				width: 100%;
			}
		}
	}
</style>
