import type { IParser } from '@/classes/parser'
import type { ISchema, TSchemaValues } from '@/classes/schema'
import type { TProperties } from '@/notion/properties'

import { ZSchema, ZSchemaValues } from '@/classes/schema'
import { ZProperties, ZPropertyData } from '@/notion/properties'

import {
  CreatePageParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import _ from 'lodash'

import { notionToSchema, schemaToNotion } from './utils'

export class Parser implements IParser {
  private readonly _Schema: ISchema

  constructor(props: ISchema) {
    this._Schema = ZSchema.parse(props)
  }

  private toIntoSchema(data: TProperties) {
    const properties = ZProperties.parse(data)
    const schemaValues: TSchemaValues = {}

    Object.entries(this._Schema.schemaData).forEach(([key, value]) => {
      if (properties[key]) {
        schemaValues[key] = notionToSchema[value](properties[key])
      }
    })

    return schemaValues
  }

  public queryDatabase<T = unknown>(queryResponse: QueryDatabaseResponse) {
    const response = _.map(queryResponse.results, (data) => {
      const { properties } = ZPropertyData.parse(data)
      return this.toIntoSchema(properties)
    })

    return response as T[]
  }

  public schemaToNotion(schemaValues: TSchemaValues) {
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
