// import { Client } from '@notionhq/client'
import { Client } from './classes/Client'
import { Parser } from './classes/Parser'
import { Schema } from './classes/Schema'

const notion = new Client('secret_iWsuS8RKnrxAdXsBE5Z7CovIxWJYZjfGPcBa7Qx3gVC')

const schema = new Schema({
  holderId: 'id',
  holderName: 'string',
  holderCpf: 'number',
  holderAge: 'number',
  holderBirthday: 'date',
  holderActive: 'boolean',
})

type TSchema = {
  holderId: string
  holderName: string
  holderCpf: number
  holderAge: number
  holderBirthday: Date
  holderActive: boolean
}

const parser = new Parser(schema)

async function teste() {
  const response = await notion.delete('63b586e20c9f49a4af5136476c0de08f')

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

  console.log(response)

  // const response = await notion.databases.query({
  //   database_id: '6ed7c317a6624d42b7e4e5379decd304',
  // })
  // const resp = parser.queryDatabase<TSchema>(response)
  // resp.forEach((s) => {
  //   console.log(s.holderName)
  // })
}
teste()

// https://www.notion.so/alexmadeira/e424eeb4fb154e9cbc48b4bc26806c62?v=57af0cfbfcd44e17becd4f2bb4e1c499&pvs=4
