function AssertIs1(testIs) {
	if (typeof testIs !== "function") throw new Error(`Received argument of invalid type "${typeof testIs}"`);
	// const formatAssertName = s => /^is[A-Z_0-9]/.test(name) ? name.replace(/^is/, "assert") : `AssertIs(${name.length > 0 ? name : "<unnamed testIs>"})`;
	const NAME_TEST =
		testIs.name.length !== 0
		? testIs.name
		// : testIs.toString().length < 50 && !testIs.toString().includes("\n")
		// ? "(" + testIs.toString() + ")"
		: "<unnamed testIs>";
	const NAME_ASSERT =
		  /^is[A-Z_0-9]/.test(testIs.name)
		? testIs.name.replace(/^is/, "assert")
		: testIs.name.length !== 0
		? `AssertIs1(${testIs.name})`
		// : testIs.toString().length < 50 && !testIs.toString().includes("\n")
		// ? `AssertIs1(${testIs.toString()})`
		: "AssertIs1(<unnamed testIs>)";
	function f(value, label = "value") {
		if (typeof label !== "string") throw new Error(`Received label argument of invalid type "${typeof label}"`);
		if (label.length === 0) throw new Error(`Label must have a non-zero length`);
		if (testIs(value)) return value;
		throw new Error(`Type assertion failed: !${NAME_TEST}(${label})` + [
			`(typeof ${label} = "${typeof value}")`,
			...(typeof value === "number" ? [`(value = ${value})`] : []),
		].map(s => "\n" + s).join(""));
	}
	Object.defineProperty(f, "name", { value: NAME_ASSERT, configurable: true });
	return f;
}
// TODO: Add more types; Will continue populating as I end up needing them.
export const isFN = v => Number.isFinite(v);
export const isUN = v => Number.isFinite(v) && v >= 0;
export const isPN = v => Number.isFinite(v) && v >  0;
export const isNN = v => Number.isFinite(v) && v <  0;
export const isI  = v => Number.isInteger(v);
export const isUI = v => Number.isInteger(v) && v >= 0;
export const isPI = v => Number.isInteger(v) && v >  0;
export const isNI = v => Number.isInteger(v) && v <  0;
export const isS  = v => typeof v === "string";
export const isPS = v => typeof v === "string" && v.length !== 0;
export const isOO = v => typeof v === "object" && v !== null && v.constructor === Object;
export const isB  = v => typeof v === "boolean";
export const isF  = v => typeof v === "function";
export const isA  = v => Array.isArray(v);
export const isPA = v => Array.isArray(v) && v.length !== 0;
export const assertFN = AssertIs1(isFN);
export const assertUN = AssertIs1(isUN);
export const assertPN = AssertIs1(isPN);
export const assertNN = AssertIs1(isNN);
export const assertI  = AssertIs1(isI );
export const assertUI = AssertIs1(isUI);
export const assertPI = AssertIs1(isPI);
export const assertNI = AssertIs1(isNI);
export const assertS  = AssertIs1(isS );
export const assertPS = AssertIs1(isPS);
export const assertOO = AssertIs1(isOO);
export const assertB  = AssertIs1(isB );
export const assertF  = AssertIs1(isF );
export const assertA  = AssertIs1(isA );
export const assertPA = AssertIs1(isPA);
// AssertLengthArray
export const AssertLA = length => {
	assertUI(length, "length");
	return (value, label = "value") => AssertIs1(function isLA(v) { return v.length === length; })(assertA(value, label), label);
};
// AssertAssertArray
export const AssertAA = assertItem => (value, label = "value") => { assertA(value, label).forEach((v, i) => assertItem(v, `${label}[${i}]`)); return value; };
// AssertTypeArray
export const AssertTA = isItem => AssertAA(AssertIs1(isItem));
// AssertExactArray | AssertEachArray
export const AssertEA = asserters => {
	AssertAA(assertF)(asserters, "asserters";
	return (value, label = "value") => {
		AssertLA(asserters.length)(value, label).forEach((v, i) => asserters[i](v, `${label}[${i}]`));
		return value;
	};
};
// AssertMultiArray
export const AssertMA = tests => AssertEA(AssertAA(assertF)(tests, "tests").map(test => AssertIs1(test)));
