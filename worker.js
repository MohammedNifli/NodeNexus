import { workerData,parentPort } from "worker_threads";

function performHeavyCalculation(iterations){
    let sum=0;
    for (let i = 0; i < iterations; i++) {
        sum += i;
      }
    return sum;

}


const result =performHeavyCalculation(workerData.iterations)

parentPort.postMessage(result)