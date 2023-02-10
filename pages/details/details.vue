<template>
	<view class="gameDetails">
		<view class="table" :style="'height:'+ windowHeight + 'px;width:' + screenWidth + 'px'">
			<view class="seat" :class="'seat' + seat.seat" v-for="seat in players" :key="seat.seat">
				<view class="cards">
					<view class="card">{{cardType[seat.card[0].type]}}{{seat.card[0].num}}</view>
					<view class="card">{{cardType[seat.card[1].type]}}{{seat.card[1].num}}</view>
				</view>
				<view class="chips">{{seat.chip}}</view>
				<view class="isBB" v-if="seat.seat == bbseat">bb</view>
			</view>
			<view class="currentOperation">
				{{currentOperation}}
			</view>
		</view>
		<view class="operationBar">
			<view class="btnList">
				<button @click="checkMoves">查看记录</button>
				<button @click="stepBack">后退</button>
				<button @click="stepForward">前进</button>
			</view>
			<!-- <progress percent="0" show-info /> -->
		</view>
	</view>
</template>

<script>
	import gameData from "@/static/data/gameData.js"
	import data from "@/static/data/data.js"
	export default {
		data() {
			return {
				currentOperation: "",
				steps: 0,
				bb: 100,
				bbseat: gameData.bb,
				players: gameData.players,
				perflop: gameData.perflop,
				flop: gameData.flop,
				turn: gameData.turn,
				river: gameData.river,
				compare: gameData.compare,
				cardType: data.cardType,
				playerCount: 0,
				windowHeight: 0,
				screenWidth: 0,
			}
		},
		onReady() {
			// console.log(this.players);
			this.playerCount = this.players.length
			this.windowHeight = wx.getSystemInfoSync().windowHeight
			this.screenWidth = wx.getSystemInfoSync().screenWidth
			// for (let i = 0; i < this.players.length; i++) {

			// }
		},
		methods: {
			checkMoves() {
				
			},
			stepBack() {

			},
			stepForward() {
				if (steps < perflop.length) {

				}
			},
		}
	}
</script>

<style lang="less">
	.gameDetails {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		.table {
			height: 346px;
			background-image: url("../../static/image/table.png");
			background-size: cover;
			background-repeat: no-repeat;
			.currentOperation {
				position: absolute;
				left: 50%;
				top: 40%;
			}
			.seat {
				height: 70rpx;
				position: absolute;

				.cards {
					display: flex;
					height: 50rpx;
					.card {
						border: 1px solid #000;
						width: 35rpx;
						margin-right: 3rpx;
					}
				}

				.chips {
					font-size: 12rpx;
				}
				.isBB {}
			}

			.seat0 {
				left: 28%;
				top: 20rpx;
			}
			
			.seat1 {
				right: 37%;
				top: 20rpx;
			}
			
			.seat2 {
				right: 13%;
				top: 50rpx;
			}
			
			.seat3 {
				right: 13%;
				bottom: 20rpx;
			}
			.seat4 {
				right: 30%;
				bottom: 6rpx;
			}
			.seat5 {
				left: 43%;
				bottom: 6rpx;
			}
			.seat6 {
				left: 25%;
				bottom: 6rpx;
			}
			.seat7 {
				left: 8%;
				bottom: 20rpx;
			}
			.seat8 {
				left: 8%;
				top: 50rpx;
			}
			
		}

		.operationBar {
			position: absolute;
			right: 10rpx;
			top: 43%;
			.btnList {
				display: flex;
				flex-direction: column;
				button {
					font-size: 12px;
				}
			}
		}
	}
</style>
