var _event_list = {};
$(function(){
	// 找到页面上所有的a标签
	var links = $(document).find("a");
	// 循环数组，拿到每一个a标签
	for(var index in links) {
		// 保存click属性的值
		var _click = links.eq(index).attr("onclick");
		// 保存href属性的值
		var _href = links.eq(index).attr("href");
		if( _click != null) {
			// 给onclick属性重新设值
			links.eq(index).attr("onclick","eval_a_click_event('a"+index+"')");
		}
		if(_href != null) {
			// 给href属性重新设值
			links.eq(index).attr("href","javascript:eval_a_href_event('a"+index+"')");
		}
		_event_list["a"+index] = [links.eq(index),_href,_click];
	}
})
 
function eval_a_click_event(id) {
	var link = _event_list[id];
	if(link != null && link[2] != null) {
		// 拿到单击事件的方法
		alert(link[2]);
		// 执行单击事件
		eval(link[2]);
	}
}
 
function eval_a_href_event(id) {
	var link = _event_list[id];
	if(link != null && link[1] != null) {
		// 拿到href属性的值
		alert(link[1]);
		// 将href属性值重新赋回原来的值
		link[0].attr("href",link[1]);
		// 移除单击事件
		link[0].removeAttr("onclick");
		// 模拟单击事件
		link[0][0].click();
		// 重写href属性的值
		link[0].attr("href","javascript:eval_a_href_event('"+id+"')");
		// 如果有单击事件，重新加上
		if(link[2] != null) {
			link[0].attr("onclick",link[2]);
		}
	}
}