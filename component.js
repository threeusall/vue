Vue.component('nav-component',{
	template:'<div :id="this.id" :class="this.btnBox"></div>',
	// template:'<div :id="this.id" class="nav-box"><button class="1">点我</button><button class="1">点我</button><div>',
	props:{
		id:String,
		btxBox:String
	},
	data:function(){
		return{
			navNames:[
				{name:"按钮1"},
				{name:"按钮2"},
				{name:"按钮3"},
				{name:"按钮4"},
				{name:"按钮5"},
			],
			node:'button',
			className:"btn"
		}
	},
	mounted() {
		this.addBtn();
	},	
	methods:{
		addBtn:function(){
			var id = document.getElementById(this.id);
			for(var i=0; i<this.navNames.length; i++){
				console.log(this.navNames[i].name)
				var node = document.createElement(this.node);
				node.className = this.className;
				var textNode = document.createTextNode(this.navNames[i].name);
				node.appendChild(textNode);
				id.appendChild(node);
				console.log(node)
			}
		},
	}
		
})


Vue.component('canvas-arrows',{
	
	template:'<canvas :id="id" :width="width" :height="height" ></canvas>',
	props:{
		id:String,
		width:Number,
		height:Number,
		canvasData:{
			Type:Object,
			defaule:() => {
				return {};
			}
		}
	},
	data:function(){
		return {
	
			ctx:Object,
			drawCtx: {
				width:Number,
				height:Number,
				r:Number,
				point:Number,
				lineWidth:null,
				grade:null,
				deletion:null,
				start:null,
				finish:null
				
			}
			
		}
	},

	mounted() {
		this.drawRound()
	},

    methods: {
		drawRound:function(){
			var cid = document.getElementById(this.id);
			var ctx = this.ctx = cid.getContext('2d');
			var d = this.drawCtx = this.canvasData;
			d.deletion = (this.canvasData.start - Math.PI/2)*2;
			d.width = cid.width;
			d.height = cid.height;
			d.r = d.width/2;
			ctx.translate(d.r,d.r); 
			ctx.beginPath();
			ctx.strokeStyle = "hotpink";
			ctx.lineWidth = d.lineWidth;
			// 空出的地方为 Math.PI/2
			ctx.arc(0,0,d.r - ctx.lineWidth/2,d.start, 2*Math.PI+(Math.PI - d.start),false);
			ctx.stroke();
			var gradeWind = [];
			for(let i=0; i<d.grade+1;i++){
				gradeWind.push(i);
			};
			gradeWind.forEach(function(number,i){
				// 计算数字坐标
				ctx.font = '16px Arial';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				
				var r = (2 * Math.PI - d.deletion)/d.grade * i;  
				var x = Math.cos(r + d.start) * (d.r - ctx.lineWidth*2);	// x 坐标
				var y = Math.sin(r + d.start) * (d.r - ctx.lineWidth*2);	// y 坐标
				ctx.fillText(number,x,y)
				ctx.arc(x,y,4,d.start, 2*Math.PI+(Math.PI - d.start),false);
				
			});
			for(let i=0; i < d.point * d.grade; i++){
				
				var r = (2 * Math.PI - d.deletion)/(d.point * d.grade) * (i);  
				var x = Math.cos(r + d.start) * (d.r - ctx.lineWidth - 4);
				var y = Math.sin(r + d.start) * (d.r - ctx.lineWidth - 4);
				ctx.beginPath();
				if(i % 5 === 0 || i === (d.point * d.grade -1) ){
					ctx.fillStyle = "#000";
					ctx.arc(x,y,2,d.start, 2*Math.PI+(Math.PI - d.start),false);
				}else{
					ctx.fillStyle = "#ccc";
					ctx.arc(x,y,2,d.start, 2*Math.PI+(Math.PI - d.start),false);
				}
				ctx.fill()
			}	
			function drawArrows(){
// 				
				var rad = d.start;
				var r = (2 * Math.PI - d.deletion)/(d.point * d.grade) * 0;  
				var x = Math.cos(r + d.start) * (d.r - ctx.lineWidth );
				var y = Math.sin(r + d.start) * (d.r - ctx.lineWidth );
				
				// canvas rotate 要和 beginPath 配合使用
				var aa = 30;
					ctx.beginPath();
					ctx.rotate(aa*Math.PI/180); 
				setInterval(function(){
					ctx.rotate(aa*Math.PI/180);
					aa++;	 
					console.log(aa)
					
				},16700)
				
				function arrowsRotate(){
					console.log(ctx)
					ctx.save();
				ctx.beginPath();
				ctx.rotate(45*Math.PI/180); 
					console.log(ctx.rotate)
					// alert("aa");
					
					let spring = 0.2;
					// let friction *= 0.9;
					const angle = Math.random(0.31,1)*180;
					let target = angle/2;
					
					ctx.beginPath();
					ctx.rotate(angle*Math.PI/180);

				}
				window.requestAnimationFrame(arrowsRotate);
				window.requestAnimationFrame(function(){
					ctx.beginPath();
					ctx.rotate(45*Math.PI/180); 
				})
				ctx.moveTo(0,0);
				ctx.lineTo(5,d.r  - ctx.lineWidth * 4);
				ctx.lineTo(20,d.r  - ctx.lineWidth * 5);
				ctx.lineTo(0,d.r  - ctx.lineWidth * 2);
				ctx.lineTo(-20,d.r  - ctx.lineWidth * 5);
				ctx.lineTo(-5,d.r  - ctx.lineWidth * 4);
				ctx.closePath();
				
				ctx.fillStyle = "darkorchid";
				ctx.fill();
			}
			drawArrows();
		}
    }

})


