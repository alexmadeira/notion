import type { IParser } from '@/classes/parser'
import type { ISchema, TSchemaValues } from '@/classes/schema'
import type { TProperties, TProperty } from '@/notion/properties'

import { ZSchema } from '@/classes/schema'
import {
  ZProperties,
  ZPropertyCheckbox,
  ZPropertyData,
  ZPropertyDate,
  ZPropertyFormula,
  ZPropertyNumber,
  ZPropertyRichText,
} from '@/notion/properties'

import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import _ from 'lodash'

export class Parser implements IParser {
  private readonly _Schema: ISchema

  constructor(props: ISchema) {
    this._Schema = ZSchema.parse(props)
  }

  private id(property: TProperty) {
    const { formula } = ZPropertyFormula.parse(property)
    return formula.string ?? ''
  }

  private string(property: TProperty) {
    const { rich_text: richText } = ZPropertyRichText.parse(property)
    return richText.reduce((a, v) => (a += v.plain_text), '')
  }

  private boolean(property: TProperty) {
    const { checkbox } = ZPropertyCheckbox.parse(property)
    return checkbox
  }

  private number(property: TProperty) {
    const { number } = ZPropertyNumber.parse(property)
    return number ?? 0
  }

  private date(property: TProperty) {
    const { date } = ZPropertyDate.parse(property)
    return date ? new Date(date.start) : null
  }

  private toIntoSchema(data: TProperties) {
    const properties = ZProperties.parse(data)
    const schemaValues: TSchemaValues = {}

    Object.entries(this._Schema.schemaData).forEach(([key, value]) => {
      if (properties[key]) {
        schemaValues[key] = this[value](properties[key])
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
}
