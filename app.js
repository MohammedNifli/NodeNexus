


import fs from 'fs';

const readableStream = fs.createReadStream('input.txt', { encode: 'utf8' })

const writableStream = fs.createWriteStream('output.txt')



import express from 'express'
import { Worker } from 'worker_threads'


const app = express()
const port = 8000


app.get('/', (req, res) => {
    res.send("Hello world")
})


function runworker(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData })
        worker.on('message', (message) => {
            console.log('Worker successfully completed');
            resolve(message);
        });
        worker.on('error', (error) => {
            console.error('Something badly happened:', error);
            reject(error);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });

    })

}

async function main() {
    try {
        const result = await runworker({ iterations: 1e7 })

        console.log('run worker', result)

    } catch (error) {
        console.log("error from worker", error)
    }
}

main()



app.listen(8000, () => {
    console.log(`server listening at http://localhost:${port}`)
})


