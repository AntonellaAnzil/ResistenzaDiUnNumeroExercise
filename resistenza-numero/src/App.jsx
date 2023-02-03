import './App.css';
import React, { useState } from 'react';

const App = () => {
  //hooks
  const [result, setResult] = useState({
    firstResult: '',
    secondResult: '',
    thirdResult: '',
    fourthResult: '',
  });
  const [inputValue, setInputValue] = useState({
    firstField: '',
    secondField: '',
    thirdField: '',
    fourthField: '',
  });
  const [kValue, setKValue] = useState();

  //functions when the user changes the content of the input field
  const handleChanged = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnChange = (event) => {
    setKValue(event.target.value);
  };

  /**
   * Function that calculates the resistance of the entered numbers.
   * @param {Number} value - input value
   * @returns the resistance number.
   */
  const getResistenza = (value) => {
    let multipliedDigits = 1;
    let count = 0;
    do {
      count += 1;
      //First of all convert the number to an array, ex. 123 to [1,2,3]
      let myFunc = (num) => Number(num);
      let intArr = Array.from(
        String(multipliedDigits === 1 ? value : multipliedDigits),
        myFunc
      );
      multipliedDigits = 1;
      // Multiply the elements of an array while the result is greater than 9
      for (let i = 0; i < intArr.length; i++) {
        multipliedDigits = multipliedDigits * intArr[i];
      }
    } while (multipliedDigits > 9);

    setResult({
      ...result,
      firstResult: `La resistenza del numero ${value} è ${count}.`,
    });
  };

  /**
   * Function that calculates the first number with the greatest resistance in a variable interval of numbers.
   * @param {Number} value input value
   * @returns the lesser number with the greatest resistance.
   */
  const getResistenzaUntil = (value) => {
    let biggestResistenza = 0;
    let biggestNumber = 0;
    for (let x = 0; x <= value; x++) {
      let multipliedDigits = 1;
      let count = 0;
      do {
        count += 1;
        // Convert the input string to an array of numbers
        let myFunc = (num) => Number(num);
        let intArr = Array.from(
          String(multipliedDigits === 1 ? x : multipliedDigits),
          myFunc
        );
        multipliedDigits = 1;
        // Multiply the elements of an array while the result is greater than 9
        for (let i = 0; i < intArr.length; i++) {
          multipliedDigits = multipliedDigits * intArr[i];
        }
        // Iterate the calculated frequencies to obtain the highest
        if (count > biggestResistenza) {
          biggestResistenza = count;
          biggestNumber = x;
        }
      } while (multipliedDigits > 9);

      setResult({
        ...result,
        secondResult: `Dal 1 al ${value} il numero con la resistenza più grande è il ${biggestNumber} (di ${biggestResistenza}).`,
      });
    }
  };
  /**
   * Function that obtains the most frequent number of the numbers entered as an argument.
   * @param {String} value - input numbers
   * @returns - the number with more frequence.
   */
  const getFrequenza = (value) => {
    // First convert the input string to an array of numbers.
    const arrayValue = value.split(',').map(Number);
    let frequencyOfEachNumber = 0;
    let higherFrequency = 0;
    let mostFrequentNumber;
    // Iterate each element of arrayValue and calculate the frequency of each number
    arrayValue.forEach((x) => {
      frequencyOfEachNumber = 0;
      arrayValue.forEach((y) => {
        if (x === y) {
          frequencyOfEachNumber++;
        }
      });
      if (frequencyOfEachNumber > higherFrequency) {
        higherFrequency = frequencyOfEachNumber;
        mostFrequentNumber = x;
      }
    });
    setResult({
      ...result,
      thirdResult: `Il numero più frequente in [${value}] è il ${mostFrequentNumber}.`,
    });
  };

  /**
   * Function that obtains the most frequent numbers of the numbers entered as an argument.
   * @param {String} value - string of numbers to convert to array
   * @param {Number} kValue - the number of elements in the output array
   * @returns - an array of the frequency numbers
   */
  const getFrequenti = (value, kValue) => {
    // First convert the input string to an array of numbers.
    const arrayValue = value.split(',').map(Number);
    let frequencyOfNumbers = {};
    // Each element of the array is itered, then creat an object where each number is assigned the value of its frequency.
    for (let i = 0; i < arrayValue.length; i++) {
      let num = arrayValue[i];
      if (!frequencyOfNumbers[num]) {
        frequencyOfNumbers[num] = 0;
      }
      frequencyOfNumbers[num]++;
    }
    let frequencyArray = [];
    // Each key of the object is itered, then creat an array of objects whit the same info.
    for (let num in frequencyOfNumbers) {
      frequencyArray.push({ number: num, frequency: frequencyOfNumbers[num] });
    }
    // Order the frequency Array by frequency.
    const frequencyArrayOrdered = frequencyArray.sort(
      (a, b) => b.frequency - a.frequency
    );
    let resultArray = [];
    // Truncate the array by the k value.
    for (let i = 0; i < kValue; i++) {
      resultArray.push(frequencyArrayOrdered[i].number);
    }
    setResult({
      ...result,
      fourthResult: `I numeri più frequenti in [${value}] sono ${resultArray}.`,
    });
  };

  return (
    <div className="App">
      <h1 className="main-title">KING Company Esercizi proposti</h1>
      <div className="container">
        <div className="first-ex-div">
          <h1>RESISTENZA DI UN NUMERO</h1>
          <p>
            La resistenza di un numero si ottiene moltiplicando tutte le cifre
            che lo compongono. Ad esempio, se si moltiplicano tutte le cifre del
            numero 882 si ottiene 128 (1*8*2). Ripetendo l'operazione per 128 si
            ottiene 16 (16). Ripetendo l'operazione per 16 si ottiene 6 (1*6). 6
            è di una sola cifra, quindi non è più possibile ripetere
            l'operazione. Dato che siamo riusciti a ripetere l'operazione per 3
            volte, diciamo che 882 ha una "resistenza" di 3.
          </p>
          <label>
            Ottieni la resistenza di un numero
            <input
              name="firstField"
              type="number"
              placeholder="Write here a number"
              onChange={handleChanged}
            ></input>
          </label>

          <button onClick={() => getResistenza(inputValue.firstField)}>
            Check
          </button>
          <p className="result">{result.firstResult}</p>
          <div>
            <h3>
              Qual'è il numero piú piccolo con maggior resistenza dal 1 al
              <input
                name="secondField"
                type="number"
                placeholder="Write here a big number"
                onChange={handleChanged}
              ></input>
              ?
            </h3>
            <button onClick={() => getResistenzaUntil(inputValue.secondField)}>
              Check
            </button>
            <p className="result">{result.secondResult}</p>
          </div>
        </div>
        <div className="space-btw"></div>
        <div className="second-ex-div">
          <h1>FREQUENZA DI UN NUMERO</h1>
          <p>
            Nell'array di interi [2,4,1,5,6,3,4,2,7,4,5,4,5] il numero 2 è
            presente 3 volte. Diciamo quindi che 2 ha una "frequenza" di 3.
            Nello stesso array il numero più frequente è 4 (con una frequenza di
            4). Il secondo numero più frequente è 5 (con una frequenza di 3).
          </p>
          <label>
            Ottieni il numero più frequente in un array di numeri interi
            <input
              name="thirdField"
              type="string"
              placeholder="es: 3,2,25"
              onChange={handleChanged}
            ></input>
          </label>
          <button onClick={() => getFrequenza(inputValue.thirdField)}>
            Check
          </button>
          <p className="result">{result.thirdResult}</p>
          <br></br>
          <p>
            Scrivere un array e un intero k, e verrà restituito un array
            contenente i primi k numeri più frequenti nell'array passato come
            argomento.
          </p>
          <label>
            Array
            <input
              name="fourthField"
              type="string"
              placeholder="es: 3,2,25 "
              onChange={handleChanged}
            ></input>
          </label>
          <label>
            Number
            <input
              name="k-number"
              type="number"
              placeholder="Number"
              onChange={handleOnChange}
            ></input>
          </label>
          <button onClick={() => getFrequenti(inputValue.fourthField, kValue)}>
            Check
          </button>
          <p className="result">{result.fourthResult}</p>
        </div>
      </div>
    </div>
  );
};

export { App };
