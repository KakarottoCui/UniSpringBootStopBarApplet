<script>
	export default {
		onLaunch: function() {
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	
	*,view,navigator {
		box-sizing: border-box;
	}
	.warp {
		background: #f5f5f5;
	}
	.car_park {
		width: 690rpx;
		border: 2rpx solid #ededed;
		border-radius: 10rpx;
		@include flex;
		justify-content: space-between;
		font-size: 28rpx;
		padding: 16rpx 24rpx;
	}
	.all_title_box {
		width: 100%;
		@include flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 0;
		
		.title {
			font-size: 32rpx;
			position: relative;
			padding-left: 34rpx;
			
			&::after {
				width: 24rpx;
				height: 6rpx;
				border-radius: 34rpx;
				background: #527bff;
				content: '';
				position: absolute;
				left: 0rpx;
				top: 10rpx;
			}
		}
		.time {
			@include flex;
			justify-content: space-between;
			align-items: center;
			
			.t {
				font-size: 28rpx;
				padding-right: 10rpx;
			}
		}
	}
	
	.lattice_box {
		width: 690rpx;
		@include flex;
		justify-content: space-between;
		flex-wrap: wrap;
		
		.item {
			width: 330rpx;
			height: 128rpx;
			border-radius: 10rpx;
			margin-top: 30rpx;
			padding: 20rpx 30rpx;
			position: relative;
	
			&.item_1 {
				background-color: rgba(253, 230, 231, 1);
				color: #CE413E;
				
				.lines {
					width: 100%;
					@include flex;
					justify-content: space-between;
					align-items: center;
					
					&:nth-child(1){
						padding-bottom: 10rpx;
					}
					.title {
						font-size: 28rpx;
					}
					.price {
						font-size: 28rpx;
					}
					.titles {
						font-size: 24rpx;
					}
					.nums {
						font-size: 24rpx;
					}
				}
			}
			&.item_2 {
				background-color: rgba(209, 255, 233, 1);
				color: #33BF73;
				
				.lines {
					width: 100%;
					@include flex;
					justify-content: space-between;
					align-items: center;
					
					&:nth-child(1){
						padding-bottom: 10rpx;
					}
					.title {
						font-size: 28rpx;
					}
					.price {
						font-size: 28rpx;
					}
					.titles {
						font-size: 24rpx;
					}
					.nums {
						font-size: 24rpx;
					}
				}
			}
			&.item_3 {
				background-color: rgba(190, 214, 249, 1);
				color: #3E7ACE;
				
				.title {
					display: block;
					font-size: 28rpx;
					padding-bottom: 10rpx;
				}
				.label {
					display: block;
					font-size: 24rpx;
				}
				.icon_box {
					width: 86rpx;
					height: 86rpx;
					line-height: 86rpx;
					border-radius: 86rpx;
					background: #3E7ACE;
					@include flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					right: 24rpx;
					top: 50%;
					margin-top: -43rpx;
				}
			}
			&.item_4 {
				background-color: rgba(251, 223, 149, 1);
				color: #A17811;
				
				.title {
					display: block;
					font-size: 28rpx;
					padding-bottom: 10rpx;
				}
				.label {
					display: block;
					font-size: 24rpx;
				}
				.icon_box {
					width: 86rpx;
					height: 86rpx;
					line-height: 86rpx;
					border-radius: 86rpx;
					background: #A17811;
					@include flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					right: 24rpx;
					top: 50%;
					margin-top: -43rpx;
				}
			}
		}
	}
	
	//表格
	$div-table-border-color: #ededed;
	$div-table-border-width: 1rpx;
	
	.div-table {
		display: table;
		width: 100%;
		height: 100%;
		border: $div-table-border-width solid $div-table-border-color;
		box-sizing: border-box;
		table-layout: fixed;
		position: relative;
		.celspan {
			display: table;
			width: 100%;
			height: 100%;
			.td {
				display: table-cell;
				border: none !important;
			}
			.td + .td {
				border-left: $div-table-border-width solid $div-table-border-color !important;
			}
		}
		.rowspan {
			display: table;
			width: 100%;
			height: 100%;
			
			.tr {
				display: table-row;
				border: none !important;
			}
		}
	
		&.fixed-thead {
			.tbody,
			.thead,
			.tr,
			.th,
			.td {
				display: block;
			}
			.tr,
			.th {
				&:after {
					content: '';
					display: block;
					visibility: hidden;
					clear: both;
					height: 0;
				}
			}
			.td {
				float: left;
				color: #333;
				font-size: 26rpx;
			}
		}
	
		.tr,
		.th {
			display: table-row;
			& + .tr,
			& + .th {
				.td,
				.th {
					border-top: $div-table-border-width solid $div-table-border-color;
					word-break: break-word;
				}
			}
		}
		.rowspan {
			.tr,
			.th {
				display: table-row;
				.td,
				.th {
					border: none;
				}
				& + .tr,
				& + .th {
					.td,
					.th {
						border-top: $div-table-border-width solid $div-table-border-color;
					}
				}
			}
		}
		.td {
			display: table-cell;
			vertical-align: middle;
			text-align: center;
			box-sizing: border-box;
			padding: 18rpx 20rpx;
			
			&.noPadding {
				padding: 0;
			}
			& + .td {
				border-left: $div-table-border-width solid $div-table-border-color;
			}
		}
		.tbody {
			display: table-row-group;
		}
		.thead {
			display: table-header-group;
			.tr,
			.th {
				.td,
				.th {
					border-bottom: $div-table-border-width solid $div-table-border-color;
				}
			}
		}
		.tfoot {
			display: table-footer-group;
			.tr,
			.th {
				.td,
				.th {
					border-top: $div-table-border-width solid $div-table-border-color;
				}
			}
		}
		.colgroup {
			display: table-column-group;
		}
		.col {
			display: table-column;
		}
		.caption {
			display: table-caption;
		}
	}
</style>
