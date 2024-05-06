import { ZESupportedProperties } from '@/notion/enums'

import { z } from 'zod'

export const ZSchemaData = z.record(ZESupportedProperties)
export const ZSchemaValues = z.record(
  z.union([z.string(), z.null(), z.number(), z.boolean(), z.date()]),
)

export const ZSchemaProps = ZSchemaData
export const ZSchema = z.object({
  schemaData: ZSchemaData,
})

//
//
//

export type TSchemaData = z.infer<typeof ZSchemaData>
export type TSchemaValues = z.infer<typeof ZSchemaValues>

export type TSchemaProps = z.infer<typeof ZSchemaProps>
export interface ISchema extends z.infer<typeof ZSchema> {}
