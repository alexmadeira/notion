import { Client } from './classes/Client'
import { Parser } from './classes/Parser'
import { Schema } from './classes/Schema'

const notion = new Client('secret_iWsuS8RKnrxAdXsBE5Z7CovIxWJYZjfGPcBa7Qx3gVC')

type TSchema = {
  holderId: string
  holderName: string
  holderCpf: string
}

const schema = new Schema<TSchema>({
  holderId: 'id',
  holderName: 'title',
  holderCpf: 'string',
})

const parser = new Parser<TSchema>(schema)

const holderAlex = parser.schemaToNotion({
  holderName: 'Alex',
  holderCpf: '39906534826',
})

const holderCNPJ = parser.schemaToNotion({
  holderName: 'Alex C Madeira',
  holderCpf: '28947502000143',
})
const holderDe = parser.schemaToNotion({
  holderName: 'Desireê',
  holderCpf: '43959339801',
})

async function criaUm() {
  await notion.create('6ed7c317a6624d42b7e4e5379decd304', holderAlex)
}

async function criaVarios() {
  await notion.createMany('6ed7c317a6624d42b7e4e5379decd304', [
    holderAlex,
    holderCNPJ,
    holderDe,
  ])
}

async function getUm(id: string) {
  const pageResponse = await notion.findUnique(id)
  const response = parser.pageResponse(pageResponse)
  console.log(response)
}

async function getAll(databaseId: string) {
  const databaseResponse = await notion.findMany(databaseId)
  const response = parser.databaseResponse(databaseResponse)
  console.log(response)
}

async function remove(id: string) {
  await notion.delete(id)
}

async function init() {
  // await criaUm()
  // await criaVarios()
  // await getUm('34ccbace4a484b4694bfe15f8a0a55f0')
  // await getAll('6ed7c317a6624d42b7e4e5379decd304')
  await remove('34ccbace4a484b4694bfe15f8a0a55f0')
}
init()
// https://www.notion.so/alexmadeira/6ed7c317a6624d42b7e4e5379decd304?v=747d7c9ac4c84533b14e963637888706&pvs=4

// const response = await notion.findUnique('d4638cb322ee47f4b9e2285f27d65957')
// const response = await notion.findMany('6ed7c317a6624d42b7e4e5379decd304')
// const data = parser.databaseResponse<TSchema>(response)
// const data = parser.pageResponse<TSchema>(response)
// const response = await notion.delete('63b586e20c9f49a4af5136476c0de08f')
//

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
