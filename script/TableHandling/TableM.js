// const dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


// var TableVars = {
//     sl: sJson["table"],
//     dump: {},
// }

// const TableHandler = {
//     set: function (target, key, value) {
//         console.log(`${key} changed from ${target[key]} to ${value}`);
//         target[key] = value;
//     }
// };

// const upsw = new Proxy(TableVars, TableHandler);


const handler = {
    // Define a trap for getting a property value
    get(target, property, receiver) {
        console.log(`Getting property '${property}'`);
        return Reflect.get(target, property, receiver);
    },
    // Define a trap for setting a property value
    set(target, property, value, receiver) {
        console.log(`Setting property '${property}' to '${value}'`);
        return Reflect.set(target, property, value, receiver);
    }
};

// Create a 2D array and normal variables
const arr = [[1, 2], [3, 4]];
let num = 10;
let str = "hello";

// Create a nested proxy object for the 2D array
const proxyArr = new Proxy(arr, {
    // Define a trap for getting an array element value
    get(target, property, receiver) {
        console.log(`Getting property '${property}'`);
        return Reflect.get(target, property, receiver);
    },
    // Define a trap for setting an array element value
    set(target, property, value, receiver) {
        console.log(`Setting property '${property}' to '${value}'`);
        return Reflect.set(target, property, value, receiver);
    }
});

// Wrap the variables in a proxy object with the defined handler
const proxy = new Proxy({ arr: proxyArr, num, str }, handler);