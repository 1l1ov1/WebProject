// 得到设备的宽度
// var deviceWidth = document.body.clientWidth;
var deviceWidth = window.innerWidth;
// 得到设备的高度
var deviceHeight = document.body.clientHeight;
// 将屏幕宽度分为1 / 25 即一行最多25个字
var fontBase = parseInt(deviceWidth / 25);
// 将Body的字体大小改为 fontBase px
document.body.style.fontSize = fontBase + 'px';

console.log('deviceWidth:' + deviceWidth);
console.log('fontBase:' + fontBase);
var logoFaceDom = document.getElementById('logoFace');
// 图片对象
var imgModel = {};
imgModel.length = imgArr.pic.length;
imgModel.pic = imgArr.pic;
imgModel.createImg = function () {
	for (let face of imgModel.pic) {
		let img = document.createElement('img');
		img.src = face;
		img.classList.add('ourFace');
		img.addEventListener('load',
			() => console.log(face + ' is loaded ' + 'within ' + (new Date() - timer) + " ms !")
		);
		logoFaceDom.insertBefore(img, logoFaceDom.children[logoFaceDom.children.length - 1]);
	}
}

const chapters = ['第1章 Introduction', '第2章 Number Systems', '第3章 Data Storage', '第4章 Computer Organization', '第5章 Computer Networks and Internet', '第6章 Operating Systems', '第7章  Software Engineering', '第8章  OOP Programming'];
var books = ['CS.jpg', 'CSS.jpg', 'CT.jpg', 'GRE.jpg', 'Git.jpg', 'NinjaJS.jpg', 'STEM.jpg', 'UML.jpg', 'bitCoin.jpg', 'canvas.jpg', 'cssAnimation.jpg', 'gitForTeams.jpg', 'internet.jpg', 'javaScript.jpg', 'learnCSS.jpg', 'linuxCMD.jpg', 'logic.jpg', 'nutrition.jpg', 'webProgramming.jpg'];

var timer = new Date() - 1;
// 遍历books
for (let book of books) {
	// 创建img标签
	let imgTag = document.createElement('img');
	// 设置src
	imgTag.src = 'lesson/' + book;
	imgTag.addEventListener('load', () => {
		console.log(book + ' is loaded ' + 'within ' + (new Date() - timer) + " ms !")
	})
}

//设置下面2行p元素行高与父容器的高度一致，使得文字在垂直方向居中 
$("lessonName").style.lineHeight = deviceHeight * 0.15 + 'px';
$("chapter").style.lineHeight = deviceHeight * 0.1 + 'px';
$("statusInfo").style.lineHeight = deviceHeight * 0.1 + 'px';

// -------- 触摸模型和功能实现 ----------

const chapterDom = $('chapter');
const bookPageDom = $('bookPage');
// 开始监听触屏事件
// 触摸开始事件
chapterDom.addEventListener('touchstart', handleStart);
// 触摸滑行事件
chapterDom.addEventListener('touchmove', handleMove);
// 触摸结束事件
chapterDom.addEventListener('touchend', handleEnd);

// 触摸开始事件
bookPageDom.addEventListener('touchstart', handleStart);
// 触摸滑行事件
bookPageDom.addEventListener('touchmove', handleMove);
// 触摸结束事件
bookPageDom.addEventListener('touchend', handleEnd);

// 触摸模型
var touchModel = {
	target: null,
	ongoingXY: [],
	deltaX: 0,
	deltaY: 0,
	time: 0,
	pushXY: function (x, y) {
		let xy = { x, y }
		this.ongoingXY.push(xy);
	},
	bookNo: 0,
	chapterNo: 0,
	respondTouch: function () {
		// 响应接触
		// 得到x的差
		this.deltaX = this.ongoingXY[this.ongoingXY.length - 1].x - this.ongoingXY[0].x;
		// 得到y的差
		this.deltaY = this.ongoingXY[this.ongoingXY.length - 1].y - this.ongoingXY[0].y;
		// 如果x滑动的距离为有效滑动
		if (Math.abs(this.deltaX) > deviceWidth / 10) {

			// 如果在章节那部分滑动
			if (this.target === $('chapter')) {
				// 如果向右滑动
				if (this.deltaX > 0) {
					this.nextChapter();
				} else {
					// 如果向左滑动
					this.preChapter();
				}
			} else if (this.target === $('bookPage')) {
				// 如果在书封面那里滑动
				// 如果向右滑动
				if (this.deltaX > 0) {
					this.nextBook();
				} else {
					// 如果向左滑动
					this.preBook();
				}
			}
		}
	},
	preChapter: function () {
		// 如果当前章节为起始章节
		if (this.chapterNo === 0) {
			// 跳回最后章节
			this.chapterNo = chapters.length - 1;
		} else {
			// 章节向前
			this.chapterNo--;
		}
		// 切换
		$("chapter").textContent = chapters[this.chapterNo];
	},
	nextChapter: function () {
		// 如果当前章节为最后章节
		if (this.chapterNo === chapters.length - 1) {
			// 跳回起始章节
			this.chapterNo = 0;
		} else {
			// 章节向后
			this.chapterNo++;
		}
		$("chapter").textContent = chapters[this.chapterNo];
	},
	preBook: function () {
		// 如果当前封面为起始封面
		if (this.bookNo === 0) {
			// 跳回最后封面
			this.bookNo = books.length - 1;
		} else {
			// 封面向前
			this.bookNo--;
		}
		$('bookPage').src = 'lesson/' + books[this.bookNo];
	},
	nextBook: function () {
		// 如果当前封面为最后封面
		if (this.bookNo === books.length - 1) {
			// 跳回起始封面
			this.bookNo = 0;
		} else {
			// 封面向后
			this.bookNo++;
		}
		$('bookPage').src =  'lesson/' + books[this.bookNo];
	},
};

function handleStart(e) {
	// 阻止了浏览器继续处理触摸（和鼠标）事件。
	e.preventDefault();
	// 得到触摸的目标
	touchModel.target = e.touches[0].target;
	// 开始的时间
	touchModel.time = new Date() - 1;
	// 清空xy
	touchModel.ongoingXY = [];
}


function handleMove(e) {
	e.preventDefault();
	// 获得已改变的触摸点列表。
	const touches = e.changedTouches;
	// 获取最开始的触摸点 离屏幕左上角的左边（包含滚动）
	let x = touches[0].pageX;
	let y = touches[0].pageY;
	x = parseInt(x);
	y = parseInt(y);
	// 存放x,y
	touchModel.pushXY(x, y);
}

function handleEnd(e) {
	e.preventDefault();
	// 设置结束时间
	touchModel.time = new Date() - touchModel.time;
	touchModel.respondTouch();
}


// 自定义一个函数，简化获取元素操作
function $(elemId) {
	if (typeof elemId !== 'string') {
		// 如果输入的不是字符串
		throw ('输入的元素id要为字符串')
	}
	return document.getElementById(elemId);
}

imgModel.createImg();