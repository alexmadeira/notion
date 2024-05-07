import { Client } from './classes/Client'
import { Parser } from './classes/Parser'
import { Schema } from './classes/Schema'

const notion = new Client('secret_iWsuS8RKnrxAdXsBE5Z7CovIxWJYZjfGPcBa7Qx3gVC')

type TSchema = {
  holderId: string
  holderName: string
  holderCpf: number
}

const schema = new Schema<keyof TSchema>({
  holderId: 'id',
  holderName: 'title',
  holderCpf: 'number',
})

console.log(schema.schemaKeys)
const parser = new Parser<keyof TSchema>(schema)

async function teste() {
  // const response = await notion.findUnique('d4638cb322ee47f4b9e2285f27d65957')
  // const response = await notion.findMany('6ed7c317a6624d42b7e4e5379decd304')
  // const data = parser.databaseResponse<TSchema>(response)
  // const data = parser.pageResponse<TSchema>(response)
  // const response = await notion.delete('63b586e20c9f49a4af5136476c0de08f')
  //

  const data = [
    parser.schemaToNotion({
      holderName: 'Alex',
      holderCpf: 2345,
    }),
    parser.schemaToNotion({
      holderName: 'Desireê',
      holderCpf: 2345,
    }),
    parser.schemaToNotion({
      holderName: 'Alex C Madeira',
      holderCpf: 2345,
    }),
  ]
  // const data = parser.schemaToNotion({
  //   holderName: 'Alex',
  //   holderCpf: 39906534826,
  //   holderAge: 33,
  //   holderBirthday: new Date(),
  //   holderActive: true,
  // })

  // console.log(data)
  // await notion.createMany('6ed7c317a6624d42b7e4e5379decd304', data)
  // --------
  // const resp = parser.schemaToNotion({
  //   holderId: 'string',
  //   holderName: 'string',
  //   holderCpf: 2,
  //   holderAge: 2,
  //   holderBirthday: new Date(),
  //   holderActive: false,
  // })
  // const response = await notion.databases.query({
  //   database_id: '6ed7c317a6624d42b7e4e5379decd304',
  // })
  // resp.forEach((s) => {
  //   console.log(s.holderName)
  // })
}
teste()

// https://www.notion.so/alexmadeira/e424eeb4fb154e9cbc48b4bc26806c62?v=57af0cfbfcd44e17becd4f2bb4e1c499&pvs=4
