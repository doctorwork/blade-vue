/*
 * @Author: insane.luojie 
 * @Date: 2017-11-13 13:27:50 
 * @Last Modified by: insane.luojie
 * @Last Modified time: 2017-12-02 16:45:13
 */

/**
 * 设置native header
 * @param {*object} opts
 */
import { isFunc } from "~/utils";

const Hybrid = {
	handlers: {},
	callback({ data, callback }) {
		this.handlers[callback](data);
	},
	on(callback, watcher) {
		this.handlers[callback] = watcher;
	}
};

window.Hybrid = Hybrid;

function setupCallback(name, cb, ctx) {
	Hybrid.on(name, function() {
		cb.call(ctx);
	});
	return name;
}

function headerMapper(name, ctx) {
	return function(item, index) {
		item.callback = setupCallback(name + index, item.callback, ctx);
		return item;
	};
}

const mappers = {
	init(opts) {
		if (window && opts.callback) {
			window[opts.callback] = Hybrid;
		}
		return { cb_function: "hybrid_callback_proxy", ...opts };
	},
	location({ params, callback }, ctx) {
		const time = new Date().getTime();
		let newParams = {};
		Object.keys(params).map(action => {
			if (typeof params[action] === "function") {
				const name = `hybrid_callback_location_${action}_${time}`;
				setupCallback(name, params[action], ctx);
				newParams[action] = name;
			} else if (["timeout", "precision"].includes(action)) {
				newParams[action] = params[action];
			}
		});
		return { params: newParams, callback };
	},
	header(opts, ctx) {
		const { left, right } = opts.params;
		if (left) {
			opts.params.left = left.map(headerMapper("header_left", ctx));
		}
		if (right) {
			opts.params.right = right.map(headerMapper("header_right", ctx));
		}
		return opts;
	}
};

const protocols = [
	"forward",
	"upload",
	"header",
	"init",
	"location",
	"loading",
	"modal",
	"back",
	"scroll",
	"pageshow",
	"pagehide",
	"device",
	"fetch",
	"clipboard",
	"loginOut",
	"dismiss",
	"storage",
	"statusBar",
	"storage"
];

export const isHybrid = /Hybrid/.test(navigator.userAgent);
export const env = {
	Android: /Android/.test(navigator.userAgent)
};

/**
 * 底层协议实现
 * @param {*string} command 协议名称
 * @param {*object} opts 协议参数
 */
function invoke(command, opts = {}, ctx) {
	if (mappers[command]) {
		opts = mappers[command](opts, ctx);
	}

	let params = {
		name: command,
		...opts
	};

	if (env.Android) {
		window.requestHybrid.postMessage(JSON.stringify(params));
	} else {
		window.webkit.messageHandlers.requestHybrid.postMessage(params);
	}
	return true;
}

let increment = 1;

export default function(action, opts = {}, callback) {
	// 检查 action 是否可用
	if (!protocols.includes(action)) {
		throw `protocol ${action} not supported`;
	}

	const time = new Date().getTime();
	const event = `hybrid_callback_${action}_${time}_${increment++}`;

	if (!isHybrid) {
		return Promise.resolve("not in hybrid environment");
	}
	Hybrid.on(event, callback);
	console.log("hybrid: ", action, event);
	invoke(action, { params: opts, callback: event }, this);
}
