function CreateOverloadedFunction(set = []) {
    func.mapOfArgTypes = new Map(set);
    function func(...args) {
        let types = defineTypesOfArr(args);
        let currentFun = func.mapOfArgTypes.get(types);
        if (currentFun === undefined) {
            throw new Error(`Function has not got overloading with such types of arguments: ${types}`);
        }
        return currentFun(...args);
    }
    return func;
}
function defineTypesOfArr(arr) {
    let strs = [];
    for (let e of arr) {
        if (typeof e === "object") {
            let obj = e;
            strs.push(obj.constructor.name);
        }
        else {
            strs.push(typeof e);
        }
    }
    return strs.join(", ");
}
var sum = CreateOverloadedFunction([
    ["number, number", (a, b) => a + b],
    ["number, number, number", (a, b, c) => a + b + c],
    ["string, string, string", (a, b, c) => a + b + c],
]);
sum.mapOfArgTypes.set("", () => "Chundra-chu-chundra");
console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum("a", "b", "c"));
console.log(sum());
var sayHello = CreateOverloadedFunction();
sayHello.mapOfArgTypes.set("", () => console.log("Hello!!!"));
sayHello();
sayHello("John");
//# sourceMappingURL=app.js.map