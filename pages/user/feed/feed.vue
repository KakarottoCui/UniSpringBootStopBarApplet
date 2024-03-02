<template>
	<view>
		<u-form :model="form" ref="uForm">
			<u-form-item label="标题"><u-input v-model="form.title" /></u-form-item>
			<u-form-item label="简介"><u-input v-model="form.content" /></u-form-item>
			<u-button type="primary" @click="sub">提交</u-button>
		</u-form>
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js"
	export default {
		data() {
			return {
				form:{
					title:"",
					content:"",
					validFlag:1
				},
				userInfo:""
			}
		},
		onShow(){
			let info = appRequest.getUserInfo();
			if(!info.uid){
				uni.clearStorage()
			}else{
				this.userInfo = info;
			}
		},
		methods: {
			sub(){
				if(!this.form.content||!this.form.content){
					uni.showToast({
						title:"请填写完整",
						icon:"none"
					})
					return;
				}
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.addNmCarComment,
					data:this.form,
					success: function(res) {
						uni.showToast({
							title:"提交成功",
							icon:"none"
						})
						
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

<style>

</style>
