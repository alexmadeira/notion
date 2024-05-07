import { z } from 'zod'

import {
  ZPropertyDateContent,
  ZPropertyFormulaContent,
  ZPropertySelectContent,
  ZPropertyTextContent,
} from './propertyContents'

export const ZPropertyTitle = z.object({
  type: z.literal('title'),
  title: z.array(ZPropertyTextContent),
})

export const ZPropertyRichText = z.object({
  type: z.literal('rich_text'),
  rich_text: z.array(ZPropertyTextContent),
})

export const ZPropertyDate = z.object({
  type: z.literal('date'),
  date: ZPropertyDateContent.optional(),
})

export const ZPropertyNumber = z.object({
  type: z.literal('number'),
  number: z.coerce.number(),
})

export const ZPropertyCheckbox = z.object({
  type: z.literal('checkbox'),
  checkbox: z.coerce.boolean(),
})

export const ZPropertySelect = z.object({
  type: z.literal('select'),
  select: ZPropertySelectContent.optional(),
})

export const ZPropertyMultiSelect = z.object({
  type: z.literal('multi_select'),
  multi_select: z.array(ZPropertySelectContent).optional(),
})

export const ZPropertyUrl = z.object({
  type: z.literal('url'),
  url: z.string(),
})
export const ZPropertyEmail = z.object({
  type: z.literal('email'),
  email: z.string().email(),
})
export const ZPropertyFormula = z.object({
  type: z.literal('formula'),
  formula: ZPropertyFormulaContent,
})
export const ZPropertyUnknown = z.object({
  type: z.string(),
})

export const ZProperty = z.union([
  ZPropertyTitle,
  ZPropertyRichText,
  ZPropertyDate,
  ZPropertyNumber,
  ZPropertyCheckbox,
  ZPropertySelect,
  ZPropertyMultiSelect,
  ZPropertyUrl,
  ZPropertyEmail,
  ZPropertyFormula,
  ZPropertyUnknown,
])

export const ZProperties = z.record(
  z.union([
    ZPropertyTitle,
    ZPropertyRichText,
    ZPropertyDate,
    ZPropertyNumber,
    ZPropertyCheckbox,
    ZPropertySelect,
    ZPropertyMultiSelect,
    ZPropertyUrl,
    ZPropertyEmail,
    ZPropertyFormula,
    ZPropertyUnknown,
  ]),
)

export const ZPropertyData = z.object({
  properties: ZProperties,
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
export type TPropertyFormula = z.infer<typeof ZPropertyFormula>
export type TProperty = z.infer<typeof ZProperty>
export type TProperties = z.infer<typeof ZProperties>
export type TPropertyData = z.infer<typeof ZPropertyData>
