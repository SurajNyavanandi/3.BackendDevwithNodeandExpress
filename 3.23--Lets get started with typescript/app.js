// function add(num1,num2){
//     return num1+num2;
// }
// console.log(add(3,4),add('3','4'));
// const n1e=document.querySelector('#num1')as HTMLInputElement;
// const n2e=document.querySelector('#num2')as HTMLInputElement;
// const btn=document.querySelector('button')!;
// function add(n1:number,n2:number){
//     return n1+n2;
// }
// btn.addEventListener('click',()=>{
// const n1=n1e.value;
// const n2=n2e.value;
// const res=add(+n1,+n2);
// console.log(res);
// })
var n1e = document.querySelector('#num1');
var n2e = document.querySelector('#num2');
var btn = document.querySelector('button');
var numarr = [];
var strarr = [];
//type guard
function add(n1, n2) {
    if (typeof n1 === 'number' && typeof n2 === 'number') {
        return n1 + n2;
    }
    else if (typeof n1 === 'string' && typeof n2 === 'string') {
        return n1 + ' ' + n2;
    }
    else {
        return +n1 + +n2; //combination of both
    }
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
btn.addEventListener('click', function () {
    var n1 = n1e.value;
    var n2 = n2e.value;
    var resnum = add(+n1, +n2);
    console.log(resnum);
    numarr.push(resnum);
    var resstr = add(n1, n2);
    console.log(resstr);
    strarr.push(resstr);
    console.log(numarr, strarr);
    printResult({ val: resnum, timestamp: new Date() });
});
