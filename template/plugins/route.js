/*
* @Author: insane.luojie
* @Date:   2017-09-30 09:33:33
 * @Last Modified by: insane.luojie
 * @Last Modified time: 2017-11-14 11:39:34
*/

export default function(router) {
	// before each route
	router.beforeEach((to, from, next) => {
		next();
	});
}
