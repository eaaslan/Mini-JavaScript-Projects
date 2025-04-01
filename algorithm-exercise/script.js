
// const reverseStr=(str)=>{
//     return str.split("").reverse().join("")
// }

// const reverseStrV2=(str)=>{
//    return str===""? "" : reverseStrV2(str.substring(1))+str.charAt(0)
// }
// console.log(reverseStrV2("12345"))

// const reverseInteger = (integer) => {
//     // Store the sign of the original number
//     const sign = Math.sign(integer);
    
//     // Convert to positive number and then to string
//     const absValue = Math.abs(integer).toString();
    
//     // Helper function to do the actual recursion
//     const reverse = (str) => {
//         return str === "" ? "" : reverse(str.substr(1)) + str.charAt(0);
//     }
    
//     // Reverse the digits and convert back to number, then apply original sign
//     return sign * parseInt(reverse(absValue));
// }

// const reverseIntegerV2 = (integer)=>{
//     let numbers= Array.from(String(integer),Number)
// }

// const maxChar= (str)=>{
//     const charMap={}
//     str.split("").forEach(char=>{
//         charMap[char]? charMap[char]++ : charMap[char]=1
//     })
//     let max= {
//         "key":"KEY",
//         "value":-Infinity
//     }
//     for(const [key,values] of Object.entries(charMap)){
//             if(values>max["value"]){
//                 max["value"]=values
//                 max["key"]=key
//             }
//     }
//     return max
// }
// console.log(maxChar("aaabbbbccd"))

// const maxChar = str => 
//     Object.entries([...str].reduce((acc, char) => 
//         ({...acc, [char]: (acc[char] || 0) + 1}), {}))
    

// console.log(maxChar("aaabbbbccd")); 

// const arrChunk=(arr,size)=>{
// const chunkedArr=[]
// for(let i = 0 ; i < arr.length ; i+=size){
//     chunkedArr.push( arr.slice(i,i+size))
// }
// return chunkedArr
// }

// console.log(arrChunk([1,2,3,4,5,6,7],5))

// const capitalizeTitle= (title)=>{


// }

// console.log(capitalizeTitle(" this is enes from blabla "))

// console.log(" this is enes from blabla ".trim().split(" ").map(([first , ...rest])=>
//  `${first.toLocaleUpperCase()+rest.join("")}`
// ))

// var isAnagram = function(s, t) {
//     const arr= new Array(26).fill(0)
//     for(let i = 0 ; i<s.length; i++){
//         arr[s.charCodeAt(i)-'a'.charCodeAt(0)]++;
//         arr[t.charCodeAt(i)-'a'.charCodeAt(0)]--
//     }

//     for(ch of arr){
      
//         if(ch!=0){
         
//             return false
//         }
//     }
//     return true
// };

// console.log(isAnagram("rat","car"))

// const countVowel= (str)=>{

//     let match= str.match(/[aeiou]/gi)
//     return match
// }

// console.log(countVowel("aediou"))

// const pyramid= (n)=>{
//     for(let row=0 ; row<n; row++){
//         let line=""
//         for(let column=0 ; column<2*n-1;column++){
//             line+="#"
//         }
//         console.log(line)
//     }
   
// }

// console.log(pyramid(2))
// function twoSum(nums, target) {

//     let map = new Map()

//     for(let i = 0  ; i < nums.length ; i++){
         
//          if(map.has(target-nums[i])){
          
//             return [map.get(target-nums[i]),i]
//          }
//          map.set(nums[i],i)

//         }
   
   
//         return false
//     }

const twoSumWithSorting=(arr,target)=>{

    let sorted = []
        
     for(let i = 0 ; i < arr.length; i++){
        sorted.push([i,arr[i]])
     }
    sorted= sorted.sort((a,b)=>(a[1]-b[1]))
     console.log(sorted)

     let left=0
     let right =arr.length-1

     while(left<right){

       let current= sorted[left][1]+sorted[right][1]
       if(current===target){
        return [Math.min(sorted[left][0],sorted[right][0]),Math.max(sorted[left][0],sorted[right][0])]
       }
       if(current>target){
        right--
       }else{
        left++
       }
     }
     return false;

}
    console.log(twoSumWithSorting([6,4,5],9))