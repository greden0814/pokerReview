const cardType = ["黑桃","红桃","梅花","方块"]
const	cardNum = [1,2,3,4,5,6,7,8,9,10,11,12,13]
const	stepChoices = ["弃牌", "跟注", "加注"]
const getCardType = function(type) {
		if (type === "") {
			return ""
		} else {
			return cardType[type]
		}
	}
export default {
	cardType,
	cardNum,
	stepChoices,
	getCardType,
}