let lis = [
    {
        "name": "alice"
    },
    {
        "name": "bob"
    },
    {
        "name": "man"
    },
    {
        "name": "dad"
    }
];
let b = { oldval: "bob", newval: "obin" }
console.log(lis)
let indexval = lis.findIndex(crrval => crrval.name == b.oldval)
if (indexval < 0) {
    console.log("item not found");
}
else {
    lis[indexval].name = b.newval;
}
console.log(lis)


function func() {
    var arr = ["shift", "splice", "filter", "pop"];

    // Removing the specified element from the array
    var spliced = arr.splice(1, 2);
    console.log("Removed element: " + spliced);
    console.log("Remaining elements: " + arr);
}
func();
