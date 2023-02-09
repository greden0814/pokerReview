var gameData = {
	bb: 2,
	players: [
		{
			name: "张三",
			seat: 0,
			status: "in",
			chip: "10000",
			card: [{type:0,num:2},{type:1,num:7}],
		},
		{
			name: "李四",
			seat: 1,
			status: "in",
			chip: "11000",
			card: [{type:2,num:8},{type:3,num:11}],
		},
		{
			name: "王五",
			seat: 2,
			status: "in",
			chip: "12000",
			card: [{type:3,num:1},{type:2,num:7}],
		},
		{
			name: "赵六",
			seat: 3,
			status: "in",
			chip: "13000",
			card: [{type:2,num:5},{type:3,num:7}],
		}
	],
	perflop: [
		100,100,100,100
	],
	flop: [
		"fold",100,100,100
	],
	turn: [
		0,100,200
	],
	river: [
		"fold","fold","fold",0
	],
	compare: {
		
	}
}
export default gameData