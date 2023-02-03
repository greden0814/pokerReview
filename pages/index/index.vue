<template>
	<view class="content">
		<!-- <view class="headerTab">
			<text :key='index' v-for="(item,index) in topNavList" class="switchTab" user-select='true'
				:class="topNavIdx==index ? 'active' : ''" @click="switchTab" :data-index="index">{{item}}</text>
		</view> -->
		<swiper class="swiper">
			<swiper-item>
					关注
			</swiper-item>
			<swiper-item>
					推荐
			</swiper-item>
		</swiper>
		<navigator url="../games/games">跳转到牌局回放功能</navigator>
		<view class="pageTab">
			<text :key='index' v-for="(item,index) in pageNavList" class="switchTab" user-select='true'
				:class="pageNavIdx==index ? 'active' : ''" @click="switchPageTab" :data-index="index">{{item}}</text>
		</view>
		<view column-count="2" column-width="auto">
			<view v-for="(item,index) in lists" :key="index">
				<image :src="item.imgUrl" ></image>
			</view>
		</view> 
	</view>
</template>
   
<script>
	import dataList from "@/static/data/dictionary.js"
	export default {
		data() {
			return {
				topNavIdx: 0,
				pageNavIdx: 0,
				topNavList: ['关注', '推荐'],
				pageNavList: ['全部', '分类1', '分类2', '分类3'],
				dataList: [{

				}],
				lists: dataList
			}
		},
		onLoad() {
			// console.log(this.lists)
		},
		methods: {
			switchTab: function(e) {
				this.topNavIdx = e.currentTarget.dataset.index
			},
			switchPageTab: function(e) {
				this.pageNavIdx = e.currentTarget.dataset.index
			},
			onPullDownRefresh() {
				// let view = this.selectComponent('#waterFallView');
				// view.fillData(true, this.data.dataList);
			},
		}
	}
</script>

<style>
	.index {
		background-color: #FBF9FE;
		font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
		flex: 1;
		min-height: 100%;
		font-size: 32rpx;
	}

	.headerTab {
		display: flex;
		justify-content: center;
		height: 2rem;
		line-height: 2rem;
	}

	.headerTab .switchTab {
		margin: 0 .5rem;
		width: 2rem;
	}

	.pageTab {
		margin-bottom: 5px;
	}

	.pageTab .switchTab {
		margin: 0 .5rem;
		width: 2rem;
		font-size: small;
	}

	.switchTab.active {
		border-bottom: 3px solid red
	}
</style>
