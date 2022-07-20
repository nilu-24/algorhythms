
//a helper function to swap elements by index in an array
export default function swap(array,i,j){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

