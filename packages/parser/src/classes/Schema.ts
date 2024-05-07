import type { ISchema, TSchemaData } from '@/classes/schema'
import type { TESupportedProperties } from '@/notion/enums'

import { ZSchemaProps } from '@/classes/schema'

import _ from 'lodash'

export class Schema<T extends string> implements ISchema {
  private _schemaData: TSchemaData = {}

  constructor(props: Record<T, TESupportedProperties>) {
    const schema = ZSchemaProps.parse(props)

    this.setSchemaData(schema)
  }

  private setSchemaData(schemaProperties: TSchemaData) {
    this._schemaData = { ...this._schemaData, ...schemaProperties }
  }

  public get schemaData() {
    return this._schemaData as Record<T, TESupportedProperties>
  }

  public get schemaKeys() {
    return _.keys(this._schemaData)
  }
}
