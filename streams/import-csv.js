import { createReadStream } from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('./tasks.csv', import.meta.url)
const stream = createReadStream(csvPath)
const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2, // Skip the header line
})

async function run() {
  const linesParse = stream.pipe(csvParse)

  for await (const line of linesParse) {
    const [ title, description ] = line

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })

    await delay(2000) // Adding 2s delay

    console.log(`Task loaded successfully.`)
  }
}

run()

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
