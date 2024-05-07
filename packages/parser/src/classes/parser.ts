import type { IParser } from '@/classes/parser'
import type { ISchema, TSchemaValue, TSchemaValues } from '@/classes/schema'
import type { TProperties } from '@/notion/properties'
import type {
  CreatePageParameters,
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'

import { ZSchema, ZSchemaValues } from '@/classes/schema'
import { ZProperties, ZPropertyData } from '@/notion/properties'

import _ from 'lodash'

import { notionToSchema, schemaToNotion } from './utils'

type RemoveId<T> = Exclude<T, `${string}Id`>

export class Parser<S extends string> implements IParser {
  private readonly _Schema: ISchema

  constructor(props: ISchema) {
    this._Schema = ZSchema.parse(props)
  }

  public toSchema(data: TProperties) {
    const properties = ZProperties.parse(data)
    const schemaValues: TSchemaValues = {}

    Object.entries(this._Schema.schemaData).forEach(([key, value]) => {
      if (properties[key]) {
        schemaValues[key] = notionToSchema[value](properties[key])
      }
    })

    return schemaValues
  }

  public databaseResponse<T = TSchemaValues>(
    results: QueryDatabaseResponse['results'],
  ) {
    const response = _.map(results, (data) => {
      const { properties } = ZPropertyData.parse(data)
      return this.toSchema(properties)
    })

    return response as T[]
  }

  public pageResponse<T = TSchemaValues>(pageResponse: PageObjectResponse) {
    const { properties } = ZPropertyData.parse(pageResponse)
    const response = this.toSchema(properties)

    return response as T
  }

  public schemaToNotion(schemaValues: Record<RemoveId<S>, TSchemaValue>) {
    const values = ZSchemaValues.parse(schemaValues)
    const properties: CreatePageParameters['properties'] = {}

    Object.entries(this._Schema.schemaData).forEach(([key, type]) => {
      if (values[key] && type !== 'id') {
        properties[key] = schemaToNotion[type](values[key])
      }
    })

    return properties
  }
}
