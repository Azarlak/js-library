import * as Types from "https://raw.githubusercontent.com/Azarlak/js-library/main/Types.js";
export function createElement(tag, { classes, parent, properties, ...rest } = {}) {
	const ELEMENT = document.createElement(Types.assertPS(tag, "tag"));
	if (Object.keys(rest).length !== 0) throw new Error(`Invalid keys present in opts: ${Object.keys(rest).join(", ")}`);
	if (classes !== undefined) {
		if (typeof classes === "string") ELEMENT.className = classes;
		else if (classes instanceof Array) classes.forEach(c => ELEMENT.classList.add(Types.assertPS(c, "c")));
		else throw new TypeError("opts.classes must be undefined, a string, or an array");
	}
	if (proprties !== undefined) {
		Types.assertOO(properties, "properties");
		for (const KEY in properties) ELEMENT[key] = properties[KEY];
	}
	if (parent !== undefined) parent.append(ELEMENT);
	return ELEMENT;
};
