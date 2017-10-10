/*
* @Author: insane.luojie
* @Date:   2017-09-30 09:33:33
* @Last Modified by:   insane.luojie
* @Last Modified time: 2017-09-30 09:33:48
*/
import api from "./api";

export default function (vue) {
	// 设置api 
	vue.prototype.$model = api;

}