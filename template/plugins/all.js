/*
 * @Author: insane.luojie
 * @Date:   2017-09-30 09:33:33
 * @Last Modified by:   insane.luojie
 * @Last Modified time: 2017-10-10 09:33:48
 */
import api from "./api";
import "../static/style";
import mixin from "./mixins";

export default function (vue) {
  // 设置api 
  vue.prototype.$model = api;

  mixin(vue);
}