module.exports = {
	completeMessage:
		"To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}cnpm install\n  npm run dev\n\n",
	prompts: {
		lint: {
			type: "confirm",
			message: "Use ESLint to lint your code?"
		}
	},
	filters: {
		".eslintrc.js": "lint"
	}
};
