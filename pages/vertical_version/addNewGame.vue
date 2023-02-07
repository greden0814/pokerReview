<template>
	<view class="addNewGame">
		<view class="table">
			<view class="seat" :class="'seat' + player.seat" v-for="player in players" :key="player.seat">
				<view class="cards">
					<view class="card" @click="setCard(player.seat,0)">{{cardTypes[player.card[0].type]}}{{player.card[0].num}}</view>
					<view class="card" @click="setCard(player.seat,1)">{{cardTypes[player.card[1].type]}}{{player.card[1].num}}</view>
				</view>
				<input class="" v-model="player.chip" type="number" placeholder="筹码数量" maxlength="8"/>
				<view class="isBB" v-if="player.seat == bbseat">bb</view>
			</view>
		</view>
		<view class="cardTypeChosen" v-show="typeListVisible">
			<cover-image class="cardType" v-for="item in [0,1,2,3]" :key="item" :src="`../../static/image/${item}.png`" @click="choseType(item)"></cover-image>
		</view>
		<view class="cardNumChosen" v-show="numListVisible">
			<view class="cardNum" :class="'cardNum' + num" v-for="num in cardNum" :key="num" @click="choseNum(num)">{{num}}</view>
		</view>
		<view class="operationBar">
			<button @click="goFlop">设置翻牌</button>
			<view style="color: red;" v-show="notFinish"> {{warningMsg}} </view>
		</view>
	</view>
</template>

<script>
	import data from "@/static/data/data.js"
	export default {
		data() {
			return {
				bb: 100,
				bbseat: null,
				players: [],
				perflop: [],
				flop: [],
				turn: [],
				river: [],
				compare: [],
				typeListVisible: false,
				numListVisible: false,
				value: [],
				cardTypes: data.cardType,
				// cardTypePics: data.cardTypePics,
				cardNum: data.cardNum,
        indicatorStyle: `height: 50px;`,
				settingSeat: 0,
				settingCard: 0,
				chosenType: 0,
				
				inputChips: false,
				array: [{ name: '中国' }, { name: '美国' }, { name: '巴西' }, { name: '日本' }],
				index: 2,
				
				notFinish: true,
				warningMsg: "",
			}
		},
		onReady() {
			for (let i = 0;i < 8;i++) {
				this.players.push({
					name: "张三",
					seat: i,
					status: "in",
					chip: null,
					card: [{type:"",num:""},{type:"",num:""}],
					// inputChips: false,
				})
			}
		},
		methods: {
			choseType(type) {
				this.typeListVisible = false
				this.numListVisible = true
				this.chosenType = type
			},
			choseNum(num) {
				this.$set(this.players[this.settingSeat].card, this.settingCard, {type:this.chosenType,num:num})
				this.numListVisible = false
			},
			setCard(seat,index) {
				this.typeListVisible = true
				this.settingSeat = seat
				this.settingCard = index
			},
				
			goFlop() {
				let playerCounts = 0
				let notFinishMark = 0
				this.players.forEach(p => {
					if (p.card[0].type !== "" && p.card[0].num !== "" && p.card[1].type !== "" && p.card[1].num !== "" && p.chip !== null) {
						playerCounts++
					} else if (p.card[0].type === "" && p.card[0].num === "" && p.card[1].type === "" && p.card[1].num === "" && p.chip === null) {
					} else {
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
					// this.notFinish = false
					uni.navigateTo({
						url: `/pages/flopPage/flopPage?num=${playerCounts}`
					})
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
			height: 674px;
			background-image: url("../../static/image/table.png");
			.seat {
				width: 80px;
				height: 80px;
				position: absolute;
			
				.cards {
					// border: 1px solid #000;
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
			.seat4 {
				left: calc(50% - 40px);
				bottom: 127px;
			}
			.seat5 {
				left: 5px;
				top: 420px;
			}
			.seat6 {
				left: 5px;
				top: 300px;
			}
			.seat7 {
				left: 5px;
				top: 180px;
			}
			
		}
		.cardTypeChosen {
			position: absolute;			
			display: flex;
			width: 220px;
			height: 200px;
			left: calc(50% - 100px);
			flex-wrap: wrap;
			top: calc(50% - 150px);
			.cardType {
				width: 80px;
				margin: 10px;
				height: 90px;
			}
		}
		.cardNumChosen {
			position: absolute;
			display: flex;
			width: 220px;
			height: 200px;
			left: calc(50% - 93px);
			flex-wrap: wrap;
			top: calc(50% - 258px);
			.cardNum {
				width: 40px;
				margin: 10px;
				height: 60px;
				text-align: center;
				line-height: 60px;
				border: 1px solid #000;
			}
			.cardNum1,.cardNum12 {
				margin-left: 40px;
				margin-right: 20px;
			}
			.cardNum2,.cardNum13 {
				margin-left: 4px;
				margin-right: 20px;
			}
		}
	}
</style>
