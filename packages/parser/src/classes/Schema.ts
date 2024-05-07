import type { ISchema, TSchemaData, TSchemaValues } from '@/classes/schema'
import type { TESupportedProperties } from '@/notion/enums'

import { ZSchemaData } from '@/classes/schema'

import _ from 'lodash'

export class Schema<TSchema extends TSchemaValues> implements ISchema {
  private _schemaData: TSchemaData = {}

  constructor(props: Record<keyof TSchema, TESupportedProperties>) {
    const schema = ZSchemaData.parse(props)

    this.setSchemaData(schema)
  }

  private setSchemaData(schemaProperties: TSchemaData) {
    this._schemaData = { ...this._schemaData, ...schemaProperties }
  }

  public get schemaData() {
    return this._schemaData as Record<keyof TSchema, TESupportedProperties>
  }
}
