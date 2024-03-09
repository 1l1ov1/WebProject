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
	for (let i = imgModel.length - 1; i >= 0 ; i-- )
	{
		var img = document.createElement('img');
		img.src = imgModel.pic[i];
		img.classList.add("ourFace");
		logoFaceDom.insertBefore(img, logoFaceDom.children[0]);
			
	}
}

imgModel.createImg();