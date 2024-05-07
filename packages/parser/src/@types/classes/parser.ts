import type { TPagination, TResponseDatabaseResult } from './client'
import type { TSchemaValues } from './schema'
import type { TProperties, TPropertyData } from '@/notion/properties'
import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'

export type TQueryDatabaseResponse = {
  pagination: TPagination
  results: TResponseDatabaseResult[]
}

export interface IParser<TSchema = TSchemaValues> {
  toSchema(props: TProperties): TSchema
  schemaToNotion(props: TSchema): CreatePageParameters['properties']
  databaseResponse(props: TQueryDatabaseResponse): TSchema[]
  pageResponse(props: TPropertyData): TSchema
}
