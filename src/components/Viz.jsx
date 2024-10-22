import React from "react";
import swap from "./swap";
import showNum from "./showNum";
import disableButtons from "./disableButtons";
import enableButtons from "./enableButtons";
import randomInt from "./randomInt";

export default function Viz() {
  //declaring all the States

  const [show,setShow] = React.useState(true);
  const [speed,setSpeed] = React.useState(5);
  //count of the bars in the array
  const [count, setCount] = React.useState(100);
  //array state
  const [array, setArray] = React.useState(createArray);


//function to generate a new array
function createArray() {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push(randomInt(35, 360));
    }
    return array;
  }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//ALGORITHMS

//bubble sort
const bubbleSort= async ()=>{
  disableButtons();

    //creating a copy of the array
    let arr = array.slice();

    for(let i =0;i<arr.length-1;i++){
        for(let j=0;j<arr.length-1-i;j++){
          setArray([...arr])
                await sleep(speed);
            if(arr[j]>arr[j+1]){
                swap(arr,j,j+1);
                setArray([...arr])
                await sleep(speed);
            }
        }
    }
    enableButtons();
}

//selection sort

const selectionSort = async ()=>{

  disableButtons();

    //create a copy of the array
let selectionArr = array.slice()

for (let i=0;i<selectionArr.length;i++){
    let minIndex = i;
    for (let j=minIndex+1;j<selectionArr.length;j++){
        setArray([...selectionArr]);
        await sleep(speed);
        if (selectionArr[j] < selectionArr[minIndex]){
            minIndex = j;
        };

    }
    setArray([...selectionArr]);
    await sleep(speed);
    swap(selectionArr,i,minIndex);
}

enableButtons();
}


//insertion sort

const insertionSort = async ()=>{

   disableButtons();
    //creating a copy of the array
    let insertionArr = array.slice();

    for(let i=1;i<insertionArr.length;i++){
        let j = i-1
        let store = insertionArr[i];
        setArray([...insertionArr]);
            await sleep(speed)

        while(j>=0 && store<insertionArr[j]){
            insertionArr[j+1] = insertionArr[j]
            setArray([...insertionArr]);
            await sleep(speed)
            j=j-1
        }
        insertionArr[j+1] = store;
        setArray([...insertionArr]);
            await sleep(speed);
    }

  enableButtons();
}

//merge sort

const mergeArr = array.slice();

const mergeSort = async(mergeArr)=>{


  if (mergeArr.length<=1){
    return;
  }
  let mid = Math.floor(mergeArr.length/2);

  let left = mergeArr.slice(0,mid);
  let right = mergeArr.slice(mid,mergeArr.length);

 await mergeSort(left);
 await mergeSort(right);

 await mergeTwo(left,right,mergeArr);


}

const mergeTwo = async(a,b,mergeArr)=>{

  let i =0;
  let j = 0;
  let k = 0;

  while(i<a.length && j<b.length){
    if(a[i]<=b[j]){

      mergeArr[k] = a[i]
      setArray([...mergeArr]);
      await sleep(speed)
        i++;
    }
    else{
      mergeArr[k] = b[j]
      setArray([...mergeArr]);
      await sleep(speed)
      j++;
    }
    k++;
  }

  while(i<a.length){
    
    mergeArr[k] = a[i]
    setArray([...mergeArr]);
      await sleep(speed)
    i++;
    k++;
  }

  while(j<b.length){
    mergeArr[k] = b[j]
    setArray([...mergeArr]);
      await sleep(speed)
    j++;
    k++;
  }
}


//quick sort

const quickArr = array.slice();

//lomuto partition

const partition = async(quickArr, left, right)=>{
  let i = left - 1;

  for(let j = left; j <= right - 1; j++){
      await sleep(speed)

      if(quickArr[j] < quickArr[right]){
          i++;
          swap(quickArr,i,j);
          setArray([...quickArr])
         await sleep(speed);
      }
  }
  i++; 

  swap(quickArr,i,right); 
 
  setArray([...quickArr])
  
  await sleep(speed);
  return i;
}

const quickSort = async(quickArr, left, right)=>{
  disableButtons();
  if(left < right){
      let partitionIndex = await partition(quickArr, left, right);

      await quickSort(quickArr, left, partitionIndex - 1);
      await quickSort(quickArr, partitionIndex + 1, right);
      setArray([...quickArr]);
  }

  enableButtons();

}


//HEAP SORT

// heapsort from https://www.geeksforgeeks.org/heap-sort/

//make copy of the array
const heapArr = array.slice();

const heapify = async(heapArr,n,i)=>{

  //let the root node be i
  var rootNode = i;

  //finding the right and left child
        var left = 2 * i + 1; 
        var right = 2 * i + 2; 

        await sleep(speed)
  
        //if the left child is larger than the root node, make root to be left
        if (left < n && heapArr[left] > heapArr[rootNode])  {
          rootNode = left;
        }

        //if the right child is larger than the root node, make root to be right
        if (right < n && heapArr[right] > heapArr[rootNode]){
          rootNode = right;
        }
    
        //root node must be at i
        if (rootNode != i) {
            swap(heapArr,i,rootNode);
            setArray([...heapArr]);

            await sleep(speed);
  
          await heapify(heapArr, n, rootNode);
        }
}

const heapSort = async(heapArr)=>{

  disableButtons();

  let n = heapArr.length;

for (var i = Math.floor(n / 2) - 1; i >= 0; i--){

 await heapify(heapArr,n,i);
}
 // extract element from the heap
 for (var i = n - 1; i > 0; i--) {
  // swap root with end
 swap(heapArr,i,0);
 setArray([...heapArr]);
 await sleep(speed);

 //heapify the remaining heap again
 await heapify(heapArr, i, 0);
}

enableButtons();
 
}


const genArray = (show)=>{

    if(show){
        return (
            <center class="bar-container">
                    {  array.map((num, index) => {
                      return (
                        <div
                          style={{
                            height: `${num}px`,
                            backgroundColor: `hsl(${num},100%,50%)`,
                            width: `${80 / count}%`,
                            fontSize:"2vw"
                          }}
                          className="bar"
                          key={index}
                        >{showNum(array,index)}</div>
                      );
                    })}
                  </center>);
    }
}


const barCodeMode = (show)=>{

  if(!show){
      return (
          <center class="bar-container">
                  {  array.map((num, index) => {
                    return (
                      <div
                        style={{
                          height: `${250}px`,
                          backgroundColor: `hsl(${num},100%,50%)`,
                          width: `${80 / count}%`,
                          fontSize:"2vw"
                        }}
                        className="bar"
                        key={index}
                      >{showNum(array,index)}</div>
                    );
                  })}
                </center>);
  }
}



//UI of the app
//display the buttons and array bars

  return (
    <div className="all-buttons">
      <h1>algo.<span id="rhythms">Rhythms</span>();</h1>

      
      <p className="intro">Enjoy the rhythms of your favourite algorithms in colorful action!</p>
      <button class="menu" onClick={()=>{setShow(false)}}> Barcode Mode</button>
      <button class = "menu" onClick={()=>{setShow(true)}}>Regular Mode</button>
      <div>

      <button id="gen-array"
        onClick={() => {
          setArray(createArray);
        }}
      >
        Generate Random Array
      </button>
      
      <button id="bs" onClick={bubbleSort}>Bubble Sort</button>
      <button id="is" onClick={insertionSort}>Insertion Sort</button>
      <button id="ss" onClick={selectionSort} >Selection Sort</button>

  <button id="qs" onClick={()=>{
  
    quickSort(quickArr,0,quickArr.length-1);

  }} >Quick Sort</button>

<button id="hs" onClick={()=>{

  heapSort(heapArr);

}}>Heap Sort</button>

      <button onClick={()=>{
            window.location.reload();
        }} style={{marginTop:"20px", backgroundColor:"red",color:"white"}}>Stop & Refresh
         </button>

         </div>

      <h3 style={{ color: "white" }}>Array Size: {count}</h3>
      <input
        id="size-slider"
        onChange={ async (e) => {
            setCount(e.target.value);
            await sleep(0);
            document.getElementById("gen-array").click();
        }}

        type="range"
        min="5"
        max="300"
      ></input>

<h3 style={{ color: "white" }}>Step Delay: {speed}</h3>
      <input
        id="speed-slider"
        onChange={(e) => {
          setSpeed(e.target.value);
        }}
        type="range"
        min="1"
        max="100"
      ></input>

      <div>
     
      </div>
      
      {genArray(show)}
      {barCodeMode(show)}

    </div>
  );
}

