<template>
	<view class="gameDetails">
		<view class="table">
			<view class="seat" :class="'seat' + seat.seat" v-for="seat in players" :key="seat.seat">
				<view class="cards">
					<view class="card">{{cardType[seat.card[0].type]}}{{seat.card[0].num}}</view>
					<view class="card">{{cardType[seat.card[1].type]}}{{seat.card[1].num}}</view>
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
				<button plain @click="checkMoves">²é¿´¼ÇÂ¼</button>
				<button @click="stepBack">back</button>
				<button @click="stepForward">forward</button>
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
			height: 346px;
			background-image: url("../../static/image/table.png");
			background-repeat: no-repeat;
			.currentOperation {
				position: absolute;
				left: 50%;
				top: 40%;
			}
			.seat {
				width: 80px;
				height: 80px;
				position: absolute;

				.cards {
					display: flex;
					height: 60px;
					.card {
						border: 1px solid #000;
						width: 40px;
						margin-right: 3px;
					}
				}

				.isBB {}
			}

			.seat0 {
				left: 30%;
				top: 20px;
			}
			
			.seat1 {
				right: 37%;
				top: 20px;
			}
			
			.seat2 {
				right: 13%;
				top: 50px;
			}
			
			.seat3 {
				right: 13%;
				bottom: 20px;
			}
			.seat4 {
				right: 30%;
				bottom: 6px;
			}
			.seat5 {
				left: 43%;
				bottom: 6px;
			}
			.seat6 {
				left: 25%;
				bottom: 6px;
			}
			.seat7 {
				left: 6%;
				bottom: 20px;
			}
			.seat8 {
				left: 6%;
				top: 65px;
			}
			
		}

		.operationBar {
			position: absolute;
			right: 10px;
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
