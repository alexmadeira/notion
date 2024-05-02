import { requestData } from '~/temp/notion'
import { ParserBuilder } from './parser'
import { SchemaBuilder } from './schema'

const schema = SchemaBuilder.create()
  .addProperty('name', 'Name', 'title')
  .addProperty('description', 'Description', 'rich_text')
  // .addProperty('people', 'Person', 'multi_select')
  // .addProperty('hours', 'Hours', 'number')
  // .addProperty('rate', 'Rate', 'number')
  // .addProperty('category', 'Category', 'select')
  .build()

const parser = ParserBuilder.create().build(schema)
const _data = parser.parseQueryDatabaseResponse(requestData)

console.log(parser)
