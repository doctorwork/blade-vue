import { makeGet, makePost, setup } from "@/api";

export default {
	home: makeGet('/api/test')
}