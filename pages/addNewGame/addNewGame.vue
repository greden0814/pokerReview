<template>
	<view class="addNewGame">
		<view class="table" :style="'height:'+ windowHeight + 'px;width:' + screenWidth + 'px'">
			<view class="seat" :class="'seat' + player.seat" v-for="player in players" :key="player.seat">
				<view class="cards" @click="setMoves">
					<view class="card" :class="checkedSeat == '' + player.seat + idx ? 'isChecked' : ''" @click="setCard(player.seat,idx)" v-for="idx in [0,1]" :key="idx">
						{{cardTypes(player.card[idx].type)}}{{player.card[idx].num}}</view>
				</view>
				<input class="chips" v-model="player.chip" type="number" placeholder="筹码数量" maxlength="8" v-if="step == 0" />
				<view v-else>{{player.chip}}</view>
				<view class="isBB" v-if="player.seat == bbseat">bb</view>
			</view>
		</view>
		<view class="cardTypeChosen" v-if="typeListVisible">
			<cover-image class="cardType" v-for="item in [0,1,2,3]" :key="item" :src="`../../static/image/${item}.png`"
				@click="choseType(item)"></cover-image>
		</view>
		<view class="cardNumChosen" v-if="numListVisible">
			<view class="cardNum" :class="'cardNum' + card.num + ' ' + card.exile" v-for="card in cardNumList"
				:key="card.num" @click="choseNum(card.num,card.exile)">{{card.num}}</view>
		</view>
		<movable-area :scale-area="true" class="movableArea" v-if="showDetail">
			<movable-view direction="all" x="260rpx" y="100rpx" class="detailDialog">
				<view class="detailHeader">
					<view class="title">操作记录</view>
					<view class="close" @click="closeDetails">X</view>
				</view>
				<view class="detailList">
					<scroll-view scroll-y="true" class="scroll-Y">
						<view class="">A</view>
					</scroll-view>
				</view>
			</movable-view>
		</movable-area>
		<view class="operationBar">
			<button plain @click="checkMoves">查看记录</button>
			<button plain @click="goFlop">配置转牌</button>
			<view style="color: red;font-size: 12px;" v-if="notFinish"> {{warningMsg}} </view>
		</view>
	</view>
</template>

<script>
	import data from "@/static/data/data.js"
	export default {
		data() {
			return {
				step: 1,
				bb: 100,
				bbseat: null,
				players: [],
				perflop: [],
				flop: [],
				turn: [],
				river: [],
				compare: [],
				choosingLock: false,
				typeListVisible: false,
				numListVisible: false,
				value: [],
				cardTypes: data.getCardType,
				// cardTypePics: data.cardTypePics,
				cardNumList: null,
				indicatorStyle: `height: 50px;`,
				settingSeat: 0,
				settingCard: 0,
				chosenType: 0,
				checkedSeat: null,

				inputChips: false,
				array: [{
					name: '中国'
				}, {
					name: '美国'
				}, {
					name: '巴西'
				}, {
					name: '日本'
				}],
				index: 2,

				notFinish: true,
				warningMsg: "",

				exileCardList: [
					[],
					[],
					[],
					[]
				],

				windowHeight: 0,
				screenWidth: 0,
				
				showDetail: false,
			}
		},
		onReady() {
			this.initCardNumList()
			for (let i = 0; i < 9; i++) {
				this.players.push({
					name: "张三",
					seat: i,
					status: "in",
					chip: null,
					card: [{
						type: "",
						num: ""
					}, {
						type: "",
						num: ""
					}],
					// inputChips: false,
				})
			}
			this.windowHeight = wx.getSystemInfoSync().windowHeight
			this.screenWidth = wx.getSystemInfoSync().screenWidth
			// console.log(wx.getSystemInfoSync());
		},
		methods: {
			initCardNumList() {
				this.cardNumList = data.cardNum.map(num => {
					return {
						num,
						exile: ""
					}
				})
			},
			choseType(type) {
				this.typeListVisible = false
				this.numListVisible = true
				this.initCardNumList()
				for (let i = 0; i < this.exileCardList[type].length; i++) {
					this.cardNumList[this.exileCardList[type][i] - 1].exile = "exiled"
				}
				this.chosenType = type
			},
			choseNum(num, exile) {
				if (exile == 'exiled') return
				this.$set(this.players[this.settingSeat].card, this.settingCard, {
					type: this.chosenType,
					num: num
				})
				//设置牌局中被选过的牌
				this.exileCard({
					type: this.chosenType,
					num: num
				})
				this.numListVisible = false
				this.choosingLock = false
				this.checkedSeat = null
			},
			setCard(seat, index) {
				if (this.choosingLock) return
				if (this.step > 0) return
				console.log("setCard");
				this.choosingLock = true
				this.typeListVisible = true
				this.checkedSeat = '' + seat + index
				this.settingSeat = seat
				this.settingCard = index
			},
			setMoves() {
				if (this.step > 0) {
					console.log("setMoves");
				}
			},
			exileCard(card) {
				this.exileCardList[card.type].push(card.num)
			},
			checkMoves() {
				this.showDetail = true
			},
			closeDetails() {
				this.showDetail = false
			},
			
			goFlop() {
				let playerCounts = 0
				let notFinishMark = 0
				this.players.forEach(p => {
					if (p.card[0].type !== "" && p.card[0].num !== "" && p.card[1].type !== "" && p.card[1].num !==
						"" && p.chip !== null) {
						playerCounts++
					} else if (p.card[0].type === "" && p.card[0].num === "" && p.card[1].type === "" && p.card[1]
						.num === "" && p.chip === null) {} else {
						notFinishMark++
					}
				})
				if (playerCounts < 2) {
					// this.notFinish = true
					this.warningMsg = "牌局人数过少"
					return
				} else if (notFinishMark > 0) {
					// this.notFinish = true
					this.warningMsg = "请补全信息"
					return
				} else {
					this.warningMsg = ""
					this.notFinish = false
					this.step++
					// uni.navigateTo({
					// 	url: `/pages/flopPage/flopPage?num=${playerCounts}`
					// })
				}
			}
		}
	}
</script>

<style lang="less">
	.addNewGame {

		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		.table {
			// height: 308rpx;
			// width: 750rpx;
			background-image: url("../../static/image/table.png");
			background-size: cover;
			background-repeat: no-repeat;

			.seat {
				// width: 80px;
				height: 70rpx;
				position: absolute;

				.cards {
					display: flex;
					height: 50rpx;

					.card {
						border: 1px solid #000;
						width: 35rpx;
						text-align: center;
						line-height: 20rpx;
						margin-right: 3rpx;
					}
					
					.isChecked {
						border: 1px solid yellow;
					}
				}

				.chips {
					width: 73rpx;
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

		.cardTypeChosen {
			position: absolute;
			display: flex;
			width: 370rpx;
			height: 80rpx;
			left: 170rpx;
			flex-wrap: wrap;
			// top: 39%;
			top: 121rpx;

			.cardType {
				flex: 1;
				height: 80rpx;
				margin-right: 10rpx;
			}
		}

		.cardNumChosen {
			position: absolute;
			display: flex;
			width: 400rpx;
			height: 120rpx;
			left: 184rpx;
			flex-wrap: wrap;
			top: 106rpx;

			.cardNum {
				width: 35rpx;
				height: 50rpx;
				margin-right: 15rpx;
				text-align: center;
				line-height: 50rpx;
				border: 1px solid #000;
			}

			.cardNum8 {
				margin-left: 25rpx;
			}

			.exiled {
				border: none;
				color: transparent;
				cursor: default;
			}
		}
		.movableArea {
			height: 100%;
			width: 100%;
			position: absolute;
			.detailDialog {
				height: 200rpx;
				width: 400rpx;
				border: 1px solid #000;
				background: rgba(1, 2, 3, .7);
				.detailHeader {
					display: flex;
						color: aliceblue;
					.title {
						width: calc(100% - 16rpx);
					}
					.close {
						width: 14rpx;
					}
				}
			}
		}
		.operationBar {
			position: absolute;
			right: 10px;
			top: 43%;

			button {
				font-size: 12px;
			}
		}
	}
</style>
