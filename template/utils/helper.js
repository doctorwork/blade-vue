/**
 * 检验对象是否为function
 * @param {*any} func 验证对象
 */
export function isFunc(func) {
	return typeof func == "function";
}

/**
 *
 * @param {*function} fn 待转换函数
 * @param {*number} arity  参数个数
 * @param {*array} a 参数
 */
export function convertToFP(fn, arity, a) {
	a = a || [];

	if (a.length >= arity) {
		return fn.apply(null, a.slice(0, arity).reverse());
	}

	return function() {
		var args = Array.prototype.slice.call(arguments);
		return convertToFP(fn, arity, a.concat(args));
	};
}

/**
 * compose functions
 * var f = compose(add1)(mult2)(square)(negate)();
 * @param {*function} f
 */
export const compose = function compose(f) {
	var queue = f ? [f] : [];
	var fn = function fn(g) {
		if (arguments.length) {
			queue.push(g);
			return fn;
		}
		return function() {
			var args = Array.prototype.slice.call(arguments);
			queue.forEach(function(func) {
				args = [func.apply(this, args)];
			});
			return args[0];
		};
	};
	return fn;
};

/**
 * 通过promise 实现简单的 chain
 * @param {*any} task
 */
export const chain = function(task) {
	return Promise.resolve(task);
};

const nativeCeil = Math.ceil;
const nativeMax = Math.max;

/**
 *
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
export function range(start, end, step, fromRight) {
	step = step === undefined ? (start < end ? 1 : -1) : step;

	var index = -1,
		length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
		result = Array(length);

	while (length--) {
		result[fromRight ? length : ++index] = start;
		start += step;
	}
	return result;
}

/**
 * 处理 await 异常
 * @param {*Promise} promise
 */
export default function to(promise) {
	return promise
		.then(data => {
			return [null, data];
		})
		.catch(err => [err]);
}

export function parseUrl(url, params) {
	return (
		url &&
		url.replace(/\{(\w+)\}/g, (m, n) => {
			return params[n];
		})
	);
}
