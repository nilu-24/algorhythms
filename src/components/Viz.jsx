import React, { Component } from "react";

export default function Viz() {
  //declaring all the States

  const [show,setShow] = React.useState(true);

  const [speed,setSpeed] = React.useState(10);

  //count of the bars in the array
  const [count, setCount] = React.useState(100);

  //array state
  const [array, setArray] = React.useState(createArray);

  //helpful functions

  //swap
  function swap(array,i,j){
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }


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

function barcodeMode(){
  setShow(false);
}



//ALGORITHMS



//bubble sort
const bubbleSort= async ()=>{
    document.getElementById("speed-slider").disabled = true;
    document.getElementById("size-slider").disabled = true;
    document.getElementById("bs").disabled = true;
    document.getElementById("is").disabled = true;
    document.getElementById("ss").disabled = true;
    document.getElementById("gen-array").disabled = true;
    //creating a copy of the array
    let arr = array.slice();

    for(let i =0;i<arr.length-1;i++){
        for(let j=0;j<arr.length-1-i;j++){
            if(arr[j]>arr[j+1]){
                swap(arr,j,j+1);
                setArray([...arr])
                await sleep(speed);
            }
        }
    }
    document.getElementById("speed-slider").disabled = false;
    document.getElementById("size-slider").disabled = false;
    document.getElementById("bs").disabled = false;
    document.getElementById("is").disabled = false;
    document.getElementById("ss").disabled = false;
    document.getElementById("gen-array").disabled = false;
}


//selection sort

const selectionSort = async ()=>{

    document.getElementById("speed-slider").disabled = true;
    document.getElementById("size-slider").disabled = true;
    document.getElementById("bs").disabled = true;
    document.getElementById("is").disabled = true;
    document.getElementById("ss").disabled = true;
    document.getElementById("gen-array").disabled = true;


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

document.getElementById("speed-slider").disabled = false;
    document.getElementById("size-slider").disabled = false;
    document.getElementById("bs").disabled = false;
    document.getElementById("is").disabled = false;
    document.getElementById("ss").disabled = false;
    document.getElementById("gen-array").disabled = false;
}


//insertion sort

const insertionSort = async ()=>{

    document.getElementById("speed-slider").disabled = true;
    document.getElementById("size-slider").disabled = true;
    document.getElementById("bs").disabled = true;
    document.getElementById("is").disabled = true;
    document.getElementById("ss").disabled = true;
    document.getElementById("gen-array").disabled = true;

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
        
    }

    document.getElementById("speed-slider").disabled = false;
    document.getElementById("size-slider").disabled = false;
    document.getElementById("bs").disabled = false;
    document.getElementById("is").disabled = false;
    document.getElementById("ss").disabled = false;
    document.getElementById("gen-array").disabled = false;
}



function showNum(array,index){
  if (array.length <20){
    return array[index];
  }
  else{
    return;
  }
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

  return (
    <div className="all-buttons">
      <h1>algo.<span style={{color:"#39FF14"}}>Rhythms</span>();</h1>
      <p className="intro">Enjoy your favourite algorithms in colorful action!</p>
      <button onClick={()=>{setShow(false)}}> Barcode Mode</button>
      <button onClick={()=>{setShow(true)}}>Regular Mode</button>
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

<h3 style={{ color: "white" }}>Step Delay: {speed}ms</h3>
      <input
        id="speed-slider"
        onChange={(e) => {
          setSpeed(e.target.value);
        }}
        type="range"
        min="1"
        max="500"
      ></input>

      <div>
     
      </div>


      {genArray(show)}
      {barCodeMode(show)}

    </div>
  );
}

//helper function to generate random number
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
