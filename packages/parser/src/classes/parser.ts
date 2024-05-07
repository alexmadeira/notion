import type { IParser, TQueryDatabaseResponse } from '@/classes/parser'
import type { ISchema, TSchemaValues } from '@/classes/schema'
import type { TProperties, TPropertyData } from '@/notion/properties'
import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'

import { ZSchemaValues } from '@/classes/schema'
import { ZProperties, ZPropertyData } from '@/notion/properties'

import _ from 'lodash'

import { notionToSchema, schemaToNotion } from '~/utils'

export class Parser<TSchema extends TSchemaValues> implements IParser<TSchema> {
  private readonly _Schema: ISchema<TSchema>

  constructor(props: ISchema<TSchema>) {
    this._Schema = props
  }

  public toSchema(data: TProperties) {
    const properties = ZProperties.parse(data)
    const schemaValues: TSchemaValues = {}

    _.mapKeys(this._Schema.schemaData, (value, key) => {
      if (properties[key]) {
        schemaValues[key] = notionToSchema[value](properties[key])
      }
    })

    return schemaValues as TSchema
  }

  public databaseResponse(props: TQueryDatabaseResponse) {
    return _.map(props.results, (data) => {
      const { properties } = ZPropertyData.parse(data)
      return this.toSchema(properties)
    })
  }

  public pageResponse(props: TPropertyData) {
    const { properties } = ZPropertyData.parse(props)
    return this.toSchema(properties)
  }

  public schemaToNotion(schemaValues: OmitId<TSchema>) {
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
