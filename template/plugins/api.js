/*eslint no-unused-vars: 0 */

import { makeGet, makePost, setup, makePut, makeDelete } from "@/api";

const apis = {
	home: makeGet("/api/test")
};

const [get, post, put, del] = 
    [makeGet, makePost, makePut, makeDelete].map(action =>{
		return decorateMaker(action, interceptor)
    });

const resource = (url, actions) => {
	if (actions) {
		Object.keys(actions).map(action => (actions[action].url = url));
	}
	return makeResource(url, actions, {
		GET: get,
		POST: post,
		PUT: put,
		DELETE: del
	});
};

function responseHandler({ data, errcode, errmsg }) {
	if (errcode === 0) {
		return data;
	} else {
		// 显示错误
		return Promise.reject({ errcode, data });
	}
}

setup({
	baseURL: API_BASE_URL,
	withCredentials: true,
	timeout: 100000,
	headers: {
		"content-type": "application/json"
	},
	interceptors: {
		response: responseHandler
	}
});

/**
 * 通过接口名称返回请求对象
 * @param {string} entry
 */
export default function (entry, data, params) {
    // entry - string, array, function

	if (apis.hasOwnProperty(entry)) {
		return isFunc(apis[entry]) ? apis[entry](data, params) : apis[entry];
	}

    throw "Entry not defined";
}

export const getApi = name => apis[name];
