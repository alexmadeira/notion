import type {
  ISchema,
  TSchemaData,
  TSchemaProperty,
  TSchemaProps,
} from '@/classes/schema'

import { ZSchemaProps } from '@/classes/schema'

import _ from 'lodash'

export class Schema implements ISchema {
  private _schemaData: TSchemaData = []

  constructor(props: TSchemaProps) {
    const schema = _.concat([], ZSchemaProps.parse(props))

    this.schemaData(schema)
  }

  private schemaData(schemaProperties: TSchemaProperty[]) {
    this._schemaData = _.concat(this._schemaData, schemaProperties)
  }
}
