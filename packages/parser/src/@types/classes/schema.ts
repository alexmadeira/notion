import { z } from 'zod'

export const ZSchemaProperty = z.object({
  key: z.string(),
  columnName: z.string(),
})

export const ZSchemaData = z.array(ZSchemaProperty)

export const ZSchemaProps = z.union([ZSchemaProperty, z.array(ZSchemaProperty)])
export const ZSchema = z.object({})

//
//
//

export type TSchemaProperty = z.infer<typeof ZSchemaProperty>
export type TSchemaData = z.infer<typeof ZSchemaData>

export type TSchemaProps = z.infer<typeof ZSchemaProps>
export interface ISchema extends z.infer<typeof ZSchema> {}
