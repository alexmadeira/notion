import { Client } from '@notionhq/client'

import { Parser } from './classes/Parser'
import { Schema } from './classes/Schema'

const notion = new Client({
  auth: 'secret_iWsuS8RKnrxAdXsBE5Z7CovIxWJYZjfGPcBa7Qx3gVC',
})

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
  const response = await notion.databases.query({
    database_id: '6ed7c317a6624d42b7e4e5379decd304',
  })
  const resp = parser.queryDatabase<TSchema>(response)
  resp.forEach((s) => {
    console.log(s.holderName)
  })
}
teste()
