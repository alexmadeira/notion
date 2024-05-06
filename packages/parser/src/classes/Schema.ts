import type { ISchema, TSchemaData, TSchemaProps } from '@/classes/schema'

import { ZSchemaProps } from '@/classes/schema'

import _ from 'lodash'

export class Schema implements ISchema {
  private _schemaData: TSchemaData = {}

  constructor(props: TSchemaProps) {
    const schema = ZSchemaProps.parse(props)

    this.setSchemaData(schema)
  }

  private setSchemaData(schemaProperties: TSchemaData) {
    this._schemaData = { ...this._schemaData, ...schemaProperties }
  }

  public get schemaData() {
    return this._schemaData
  }
}
