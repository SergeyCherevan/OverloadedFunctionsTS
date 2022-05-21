type AnyFunc = (...args: any[]) => any;

interface IOverloadedFunction {
    (...args: any[]): any;
    mapOfArgTypes: Map<string, AnyFunc>;
}

function CreateOverloadedFunction(set: [string, AnyFunc][] = []): IOverloadedFunction {

    func.mapOfArgTypes = new Map<string, AnyFunc>(set);
    function func(...args) {

        let types: string = defineTypesOfArr(args);

        let currentFun: AnyFunc = func.mapOfArgTypes.get(types);

        if (currentFun === undefined) {
            throw new Error(`Function has not got overloading with such types of arguments: ${types}`);
        }
        return currentFun(...args);
    }

    return func;
}

function defineTypesOfArr(arr: any[]): string {

    let strs: string[] = [];
    for (let e of arr) {

        if (typeof e === "object") {

            let obj: object = e;
            strs.push(obj.constructor.name);
        } else {

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
sum.mapOfArgTypes.set("", () => "Chundra-chu-chundra")

console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum("a", "b", "c"));
console.log(sum());



var sayHello = CreateOverloadedFunction();
sayHello.mapOfArgTypes.set("", () => console.log("Hello!!!"));

sayHello();
sayHello("John");