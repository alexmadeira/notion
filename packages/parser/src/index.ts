import { Client } from './classes/Client'
import { Parser } from './classes/Parser'
import { Schema } from './classes/Schema'

const notion = new Client('secret_iWsuS8RKnrxAdXsBE5Z7CovIxWJYZjfGPcBa7Qx3gVC')

const schema = new Schema({
  holderId: 'id',
  holderName: 'title',
  holderCpf: 'number',
  holderAge: 'number',
  holderActive: 'boolean',
  holderBirthday: 'date',
})

type TSchema = {
  holderId: string
  holderName: string
  // holderCpf: number
  // holderAge: number
  // holderBirthday: Date
  // holderActive: boolean
}

const parser = new Parser(schema)

async function teste() {
  // const response = await notion.findMany('6ed7c317a6624d42b7e4e5379decd304')
  // const response = await notion.delete('63b586e20c9f49a4af5136476c0de08f')
  // const response = await notion.createMany('6ed7c317a6624d42b7e4e5379decd304', [
  //   {
  //     holderName: {
  //       title: [
  //         {
  //           text: {
  //             content: 'marlon brando',
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     holderName: {
  //       title: [
  //         {
  //           text: {
  //             content: 'Kratos',
  //           },
  //         },
  //       ],
  //     },
  //   },
  // ])

  const data = parser.schemaToNotion({
    holderName: 'Jorge',
    holderCpf: 39906534826,
    holderAge: 33,
    holderBirthday: new Date(),
    holderActive: true,
  })
  console.log(JSON.stringify(data, null, 2))

  await notion.create('6ed7c317a6624d42b7e4e5379decd304', data)

  // const resp = parser.schemaToNotion({
  //   holderId: 'string',
  //   holderName: 'string',
  //   holderCpf: 2,
  //   holderAge: 2,
  //   holderBirthday: new Date(),
  //   holderActive: false,
  // })
  // const data = parser.queryDatabase<TSchema>(response)

  // const response = await notion.databases.query({
  //   database_id: '6ed7c317a6624d42b7e4e5379decd304',
  // })
  // resp.forEach((s) => {
  //   console.log(s.holderName)
  // })
}
teste()

// https://www.notion.so/alexmadeira/e424eeb4fb154e9cbc48b4bc26806c62?v=57af0cfbfcd44e17becd4f2bb4e1c499&pvs=4
