import { $get, $post, setup } from "@/api";

// 创建get 请求 路由
function makeGet (url) {
	return function (data) {
		return $get(url, data);
	}
}

// 创建post 请求 路由
function makePost (url) {
	return function (data) {
		return $post(url, data);
	}
}

/**
 * 覆盖错误信息 key 
 * 默认： errcode， errmsg
 * @type {String}
 */
setup(null, {
	errcode: 'error_code',
	errmsg: 'error_msg'
});

export default {
	home: makeGet('/api/test')
}