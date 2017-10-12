/*
 * @Author: insane.luojie
 * @Date:   2017-09-30 09:33:33
 * @Last Modified by:   insane.luojie
 * @Last Modified time: 2017-10-10 09:33:48
 */
import api from "./api";
import "../static/style";

const noop = function () {},
	expressionCache = (function () {
	    var cahce = {};
	    return {
	        get: function (exp) {
	            return cahce['$exp_' + exp];
	        },
	        put: function (exp, val) {
	            cahce["$exp_" + exp] = val;
	        }
	    };
	})();

function parseExpression(exp) {
    // 去掉前后空字符
    exp = exp.trim()
    if (exp.indexOf("[") == 0) {
        throw "express start with [ not supported yet";
    }

    var hit = expressionCache.get(exp)
    if (hit) {
        return hit
    }
    // 存放解析之后的结果
    var res = {
        exp: exp
    }
    // 每个exp表达式的解析结果中必须有get方法
    res.get = makeGetterFn('scope.' + exp)
    expressionCache.put(exp, res)
    return res
}

function makeGetterFn(body) {
    try {
        // scope是函数的参数；body是方法体。将此方法赋值给表达式的get方法，就可以方便的拿到表达式的值
        return new Function('scope', 'return ' + body + ';')
    } catch (e) {
        return noop
    }
}

export default function (vue) {
  // 设置api 
  vue.prototype.$model = api;

  /**
   * 添加简单的 keypath 获取 实例值方法
   * @param  {string} key vue实例中data 属性的 keypath - 'a.b.c', 暂不支持以 [] 开头的表达式
   * @return {string|object}
   */
  vue.prototype.$get = function (key) {
      // 解析表达式，并返回一个包含get方法的对象。
      var res = parseExpression(key)
      if (res) {
          // 这里不能保证在执行get时不报错，因此需要放入try/catch中
          try {
              // get方法接收一个参数作为它的参数
              return res.get.call(this, this)
          } catch (e) {}
      }
  };

  vue.mixin({
  	methods: {
  		$forward (path, opts, replace) {
  			// 默认使用vue-router
  			if (!replace) {
	  			return this.$router.push(Object.assign({ path } opts));
  			}
  			this.$router.replace(Object.assign({ path } opts));
  		},
  		$redirect (url, replace) {
  			//默认使用location
  			if (replace) {
  				location.replace(url);
  			} else {
  				location.href = url;
  			}
  		}
  	}
  })
}