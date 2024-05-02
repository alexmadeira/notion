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

export const ZPropertyTitle = z.object({
  id: z.string(),
  type: z.literal('title'),
  title: z.array(ZPropertyTextContent),
})

export const ZPropertyRichText = z.object({
  id: z.string(),
  type: z.literal('rich_text'),
  rich_text: z.array(ZPropertyTextContent),
})

export const ZPropertyDate = z.object({
  id: z.string(),
  type: z.literal('date'),
  date: z.object({
    start: z.string(),
  }),
})

export const ZPropertyNumber = z.object({
  id: z.string(),
  type: z.literal('number'),
  number: z.coerce.number(),
})

export const ZPropertyCheckbox = z.object({
  id: z.string(),
  type: z.literal('checkbox'),
  checkbox: z.coerce.boolean(),
})

export const ZPropertySelect = z.object({
  id: z.string(),
  type: z.literal('select'),
  select: ZPropertySelectContent.optional(),
})

export const ZPropertyMultiSelect = z.object({
  id: z.string(),
  type: z.literal('multi_select'),
  multi_select: z.array(ZPropertySelectContent).optional(),
})

export const ZPropertyUrl = z.object({
  id: z.string(),
  type: z.literal('url'),
  url: z.string(),
})
export const ZPropertyEmail = z.object({
  id: z.string(),
  type: z.literal('url'),
  email: z.string().email(),
})

//
//
//

export type TPropertyText = z.infer<typeof ZPropertyTextContent>
export type TPropertySelectContent = z.infer<typeof ZPropertySelectContent>

export type TPropertyTitle = z.infer<typeof ZPropertyTitle>
export type TPropertyRichText = z.infer<typeof ZPropertyRichText>
export type TPropertyDate = z.infer<typeof ZPropertyDate>
export type TPropertyNumber = z.infer<typeof ZPropertyNumber>
export type TPropertyCheckbox = z.infer<typeof ZPropertyCheckbox>
export type TPropertySelect = z.infer<typeof ZPropertySelect>
export type TPropertyMultiSelect = z.infer<typeof ZPropertyMultiSelect>
export type TPropertyUrl = z.infer<typeof ZPropertyUrl>
export type TPropertyEmail = z.infer<typeof ZPropertyEmail>
