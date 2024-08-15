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

const n1e=document.querySelector('#num1')as HTMLInputElement;
const n2e=document.querySelector('#num2')as HTMLInputElement;
const btn=document.querySelector('button')!;

const numarr:number[]=[];
const strarr:string[]=[];

//type guard

type NumOrStr=number|string;
type Restype={val:number;timestamp:Date}

function add(n1:NumOrStr,n2:NumOrStr){ //any
    if(typeof n1 ==='number' && typeof n2 === 'number'){
        return n1+n2;
    }else if(typeof n1 ==='string' && typeof n2 ==='string'){
        return n1+' '+n2;
    }else{
        return +n1 + +n2;//combination of both
    }
}

function printResult(resultObj:Restype){
    console.log(resultObj.val);
    
}

btn.addEventListener('click',()=>{
const n1=n1e.value;
const n2=n2e.value;
const resnum=add(+n1,+n2);
//console.log(resnum);
numarr.push(resnum as number);

const resstr=add(n1,n2);
//console.log(resstr);
strarr.push(resstr as string);

console.log(numarr,strarr);


printResult({val:resnum as number ,timestamp:new Date()});


})

const Prom=new Promise<string>((resolve,reject)=>{
    setTimeout(()=>{
        resolve('It works');
    },2000);
});

Prom.then((res)=>{
    console.log(res.split('w'));
    
})
