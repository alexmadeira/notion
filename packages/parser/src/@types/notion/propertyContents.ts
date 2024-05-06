import { z } from 'zod'

import { ZESelectColor } from './enums'

export const ZPropertyTextContent = z.object({
  type: z.literal('text'),
  text: z.object({
    content: z.string(),
  }),
  plain_text: z.string(),
})

export const ZPropertySelectContent = z.object({
  id: z.string(),
  name: z.string(),
  color: ZESelectColor.optional(),
})

export const ZPropertyDateContent = z.object({
  start: z.string(),
})

export const ZPropertyFormulaContent = z.object({
  type: z.literal('string'),
  string: z.union([z.string(), z.null()]),
})

//
//
//

export type TPropertyTextContent = z.infer<typeof ZPropertyTextContent>
export type TPropertySelectContent = z.infer<typeof ZPropertySelectContent>
export type TPropertyDateContent = z.infer<typeof ZPropertyDateContent>
export type TPropertyFormulaContent = z.infer<typeof ZPropertyFormulaContent>
