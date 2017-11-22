/*eslint no-unused-vars: 0 */

import { makeGet, makePost, setup } from "@/api";

const apis = {
	home: makeGet("/api/test")
};

/**
 * 通过接口名称返回请求对象
 * @param {string} entry
 */
export default function (entry, data, params) {
    // entry - string, array, function

    if (apis.hasOwnProperty(entry)) {
        return apis[entry](data, params);
    }

    throw "Entry not defined";
}
