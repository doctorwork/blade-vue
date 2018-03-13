const trim = function(string) {
	return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};

/* istanbul ignore next */
export function hasClass(el, cls) {
	if (!el || !cls) return false;
	if (cls.indexOf(" ") !== -1)
		throw new Error("className should not contain space.");
	if (el.classList) {
		return el.classList.contains(cls);
	} else {
		return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
	}
}

/* istanbul ignore next */
export function addClass(el, cls) {
	if (!el) return;
	var curClass = el.className;
	var classes = (cls || "").split(" ");

	for (var i = 0, j = classes.length; i < j; i++) {
		var clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.add(clsName);
		} else {
			if (!hasClass(el, clsName)) {
				curClass += " " + clsName;
			}
		}
	}
	if (!el.classList) {
		el.className = curClass;
	}
}

/* istanbul ignore next */
export function removeClass(el, cls) {
	if (!el || !cls) return;
	var classes = cls.split(" ");
	var curClass = " " + el.className + " ";

	for (var i = 0, j = classes.length; i < j; i++) {
		var clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.remove(clsName);
		} else {
			if (hasClass(el, clsName)) {
				curClass = curClass.replace(" " + clsName + " ", " ");
			}
		}
	}
	if (!el.classList) {
		el.className = trim(curClass);
	}
}

export function removeElement(el) {
	if (typeof el.remove !== "undefined") {
		el.remove();
	} else {
		el.parentNode.removeChild(el);
	}
}

export function getRect(el) {
	if (el instanceof window.SVGElement) {
		let rect = el.getBoundingClientRect();
		return {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height
		};
	} else {
		return {
			top: el.offsetTop,
			left: el.offsetLeft,
			width: el.offsetWidth,
			height: el.offsetHeight
		};
	}
}

export function getData(el, name, val) {
	let prefix = "data-";
	if (val) {
		return el.setAttribute(prefix + name, val);
	}
	return el.getAttribute(prefix + name);
}
