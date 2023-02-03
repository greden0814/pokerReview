<template>
	<view class="gameDetails">
		<view class="table">
			<view class="seat" :class="'seat' + seat.seat" v-for="seat in players">
				<view class="cards">
					<view class="">{{cardType[seat.card[0].type]}}{{seat.card[0].num}}</view>
					<view class="">{{cardType[seat.card[1].type]}}{{seat.card[1].num}}</view>
				</view>
				{{seat.chip}}
				<view class="isBB" v-if="seat.seat == bbseat">bb</view>
			</view>
			<view class="currentOperation">
				{{currentOperation}}
			</view>
		</view>
		<view class="operationBar">
			<view class="btnList">
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
			}
		},
		onReady() {
			console.log(this.players);
			this.playerCount = this.players.length
			// for (let i = 0; i < this.players.length; i++) {

			// }
		},
		methods: {
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
			height: 674px;
			background-image: url("../../static/image/table.png");
			.currentOperation {
				position: absolute;
				left: 50%;
				top: 40%;
			}
			.seat {
				width: 80px;
				height: 60px;
				position: absolute;

				.cards {
					border: 1px solid #ccc;
					display: flex;
				}

				.isBB {}
			}

			.seat0 {
				left: calc(50% - 40px);
				top: 20px;
			}

			.seat1 {
				right: 5px;
				top: 180px;
			}

			.seat2 {
				right: 5px;
				top: 300px;
			}

			.seat3 {
				right: 5px;
				top: 420px;
			}
		}

		.operationBar {
			.btnList {
				display: flex;

			}
		}
	}
</style>
