
//helper function to generate random number
export default function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }