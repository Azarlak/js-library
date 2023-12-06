function AssertIs1(testIs) {
	if (typeof testIs !== "function") throw new Error(`Received argument of invalid type "${typeof testIs}"`);
	const formatAssertName = s => /^is[A-Z_0-9]/.test(name) ? name.replace(/^is/, "assert") : `AssertIs(${name.length > 0 ? name : "<unnamed testIs>"})`;
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
		throw new Error(`Type assertion failed: !${NAME_TEST}(${label})`);
	}
	Object.defineProperty(f, "name", { value: NAME_ASSERT, configurable: true });
	return f;
}
// TODO: Add more types; Will populate as I end up needing them.
export const isPS = v => typeof v === "string" && v.length !== 0;
export const isOO = v => typeof v === "object" && v !== null && v.constructor === Object;
export const assertPS = AssertIs1(isPS);
export const assertOO = AssertIs1(isOO);
