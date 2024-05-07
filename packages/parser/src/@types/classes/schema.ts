import { ZESupportedProperties } from '@/notion/enums'

import { z } from 'zod'

export const ZSchemaData = z.record(ZESupportedProperties)

export const ZSchemaStringValue = z.string()
export const ZSchemaNumberValue = z.coerce.number()
export const ZSchemaBooleanValue = z.coerce.boolean()
export const ZSchemaDateValue = z.coerce.date()
export const ZSchemaNullValue = z.null()

export const ZSchemaValue = z.union([
  ZSchemaStringValue,
  ZSchemaNumberValue,
  ZSchemaBooleanValue,
  ZSchemaDateValue,
  ZSchemaNullValue,
])

export const ZSchemaValues = z.record(ZSchemaValue)

export const ZSchemaProps = ZSchemaData
export const ZSchema = z.object({
  schemaData: ZSchemaData,
})

//
//
//

export type TSchemaData = z.infer<typeof ZSchemaData>
export type TSchemaValue = z.infer<typeof ZSchemaValue>
export type TSchemaValues = z.infer<typeof ZSchemaValues>

export type TSchemaProps = z.infer<typeof ZSchemaProps>
export interface ISchema extends z.infer<typeof ZSchema> {}
