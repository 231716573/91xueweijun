export function getRandomInt(min, max) {
  // 取得min ~ max之间的整数，包括min跟max
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 打乱顺序
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}


// 添加 class
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 判断是否存在此 class
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')

  return reg.test(el.className)
}

// 删除 class
export function removeClass(el, className) {
  if (hasClass(el, className)){
		var reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
		el.className = el.className.replace(reg, "");
	}
}

// 设置、获取属性
export function getData(el, name, val) {
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}


// 取得url参数
export function GetString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r =window.location.hash.replace(/^#.*\?/, '').match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}

// 获取时间
export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}

  // console.log(fmt)
	return fmt;
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}
