<template>
	<view>
		<view class="warp">
			<view class="name">个人信息</view>
			<u-form labelPosition="left" label-width="70" :model="form" ref="uForm">
				<u-form-item prop="nickname" borderBottom label="姓名">
					<u-input v-model="form.nickName" placeholder="请输入姓名"/>
				</u-form-item>
				<u-form-item prop="mobile" borderBottom label="手机号">
					<u-input v-model="form.phone" placeholder="请输入手机号"/>
				</u-form-item>
				<u-form-item borderBottom label="车牌号" prop="plateNumber">
					<u-input v-model="form.carNo" placeholder="请输入车牌号"/>
				</u-form-item>
				<u-form-item label="性别">
					<u-radio-group v-model="form.gender" @change="radioGroupChange">
						<u-radio name="1"></u-radio>男 
						<view style="margin-left: 40rpx;"></view>
						<u-radio name="0"></u-radio>女
					</u-radio-group>
				</u-form-item>
				
			</u-form>
			
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
				userInfo:{
					nickname:"",
					mobile:""
				},
				login:false,
				array: [],
				index:0,
				parkInfo:[],
				selItem:{},
				form:{
					mobile:"",
					nickname:"",
					gender:"1",
					plateNumber:"",
					orgId:0,
					orgName:"",
					parkManageId:0,
					parkManageName:0,
					pass:"",
					pass2:""
				},
				show:true
			};
		},
		onShow(){
			let info = appRequest.getUserInfo();
			console.log(JSON.stringify(this.userInfo))
			if(!info){
				uni.clearStorage()
				this.userInfo.nickname = "游客"
				this.userInfo.mobile = "登录后查看"
				uni.navigateTo({
					url:"/pages/user/index"
				})
			}else{
				let _this = this;
				this.userInfo = info;
				this.login = true;
				this.form = info;
				this.form["pass3"] = "";
				this.form["pass2"] = "";
				this.form["pass1"] = "";
				let parkManageId = info.parkManageId;
				
				this.parkInfo.map(function(item,index,arr){
					if(item.parkManageId == parkManageId){
						_this.index = index;
					}
				})
				
				// let info = _this.parkInfo[_this.index];
				// _this.form.orgId = info.orgId;
				// _this.form.orgName = info.orgName;
				// _this.form.parkManageId = info.id;
				// _this.form.parkManageName = info.name;
				
			}
		},
		onLoad(){
			this.getParkInfo();
		},
		methods:{
			parkChange(e){
				this.index = e.detail.value;
				let info = this.parkInfo[this.index];
				this.form.orgId = info.orgId;
				this.form.orgName = info.orgName;
				this.form.parkManageId = info.id;
				this.form.parkManageName = info.name;
			},
			radioGroupChange(e){
				this.form.gender = e;
			},
			sub(){
				let _this = this;
				let base64en = new base64();
				if(_this.form.nickname =="" || _this.form.parkManageName == ""){
					uni.showToast({
						title:"请填写完整",
						icon:"none"
					})
					
					return;
				}
				
				if( !_this.$u.test.mobile(_this.form.mobile) ){
					uni.showToast({
						title:"请填写正确的手机号格式",
						icon:"none"
					})
					return;
				}
				
				if( !_this.$u.test.carNo(_this.form.plateNumber) ){
					uni.showToast({
						title:"请填写正确的车牌号格式",
						icon:"none"
					})
					return;
				}
				
				if(base64en.encode(_this.form.pass3) != _this.form.pass  ){
					
					uni.showToast({
						title:"原密码错误",
						icon:"none"
					})
					
					return;
				}
				
				
				if(_this.form.pass2.length<6  || _this.form.pass1.length<6 || _this.form.pass2!=_this.form.pass1 ){
					
					uni.showToast({
						title:"请输入两次新密码并保持一致，密码至少6位数",
						icon:"none"
					})
					
					return;
				}
				
				this.form.pass = base64en.encode(this.form.pass2);
				
				appRequest.request({
					method: "POST",
					data: _this.form,
					url: appRequest.urlMap.register,
					success: function(res) {
						if(res.data.code == 0){
							uni.clearStorage();
							uni.showModal({
								title:"信息",
								content:"修改成功，将前往登录页面",
								showCancel:false,
								success:function(e){
									uni.reLaunch({
										url:"/pages/simple/login"
									})
								}
							})
						}else{
							uni.showModal({
								title:"信息",
								content:"修改失败，退回个人中心",
								showCancel:false,
								success:function(e){
									uni.reLaunch({
										url:"/pages/user/index"
									})
								}
							})
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
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
			this.$refs.uForm.setRules(this.rules);
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
