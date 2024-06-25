import { useEffect, useState } from "react";
import numbers from "../../10m.txt";
import LoadingSpinner from "../LoadingSpinner";
import mergeSort from "../../helpers/mergeSort";
import "./styles.css";

export default function Calculation() {
  const [numbersArray, setNumbersArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({
    min: 0,
    max: 0,
    average: 0,
    mediana: 0,
  });
  const [disabled, setDisabled] = useState(false);

  function importNumbers() {
    fetch(numbers)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error(response.status);
      })
      .then((textContent) => {
        setNumbersArray(textContent.split("\n").map(Number));
        setLoading(false);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
    return numbersArray || "Loading...";
  }

  useEffect(() => {
    importNumbers();
  }, []);

  function calculation() {
    setDisabled(true);
    let sortedNumbers = mergeSort(numbersArray);
    setResults({
      max: sortedNumbers[numbersArray.length - 1],
      min: sortedNumbers[0],
      average:
        sortedNumbers.reduce((total, item) => total + item) /
        sortedNumbers.length,
      mediana: findMediana(sortedNumbers),
    });
  }
  function findMediana(array) {
    let length = array.length;
    if (length % 2 === 0) {
      return (array[length / 2] + array[length / 2 - 1]) / 2;
    } else return array[(length - 1) / 2];
  }

  return (
    <div className="container">
      {loading && <LoadingSpinner />}
      {error && <div>Error {error} occurred </div>}
      {!loading && (
        <div>
          <button onClick={calculation} disabled={disabled}>
            Почати обчислення
          </button>
        </div>
      )}
      {!loading && (
        <div className="results">
          <p>
            <span>Максимальне число в файлі:</span>
            <span className="number">{results.max}</span>
          </p>
          <p>
            <span>Мінімальне число в файлі:</span>
            <span className="number">{results.min}</span>
          </p>
          <p>
            <span>Середнє арифметичне значення: </span>
            <span className="number">{results.average}</span>
          </p>
          <p>
            <span>Медіана:</span>
            <span className="number">{results.mediana}</span>
          </p>
        </div>
      )}
    </div>
  );
}
