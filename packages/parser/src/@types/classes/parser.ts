import {
  ZPropertyCheckbox,
  ZPropertyDate,
  ZPropertyEmail,
  ZPropertyMultiSelect,
  ZPropertyNumber,
  ZPropertyRichText,
  ZPropertySelect,
  ZPropertySelectContent,
  ZPropertyTitle,
  ZPropertyUrl,
} from '@/notion/properties'

import { z } from 'zod'

export const ZNotImplementedFunction = z.function().args().returns(z.void())

export const ZParser = z.object({
  title: z.function().args(ZPropertyTitle).returns(z.string()),
  number: z.function().args(ZPropertyNumber).returns(z.number()),
  checkbox: z.function().args(ZPropertyCheckbox).returns(z.boolean()),
  rich_text: z.function().args(ZPropertyRichText).returns(z.string()),
  url: z.function().args(ZPropertyUrl).returns(z.string()),
  email: z
    .function()
    .args(ZPropertyEmail)
    .returns(z.union([z.string().email(), z.null()])),
  multi_select: z
    .function()
    .args(ZPropertyMultiSelect)
    .returns(z.array(ZPropertySelectContent)),
  date: z
    .function()
    .args(ZPropertyDate)
    .returns(z.union([z.date(), z.null()])),
  select: z
    .function()
    .args(ZPropertySelect)
    .returns(z.union([ZPropertySelectContent, z.null()])),

  created_by: ZNotImplementedFunction,
  created_time: ZNotImplementedFunction,
  files: ZNotImplementedFunction,
  formula: ZNotImplementedFunction,
  last_edited_by: ZNotImplementedFunction,
  last_edited_time: ZNotImplementedFunction,
  people: ZNotImplementedFunction,
  phone_number: ZNotImplementedFunction,
  relation: ZNotImplementedFunction,
  status: ZNotImplementedFunction,
  unique_id: ZNotImplementedFunction,
  verification: ZNotImplementedFunction,
})

export type TNotImplementedFunction = z.infer<typeof ZNotImplementedFunction>
export interface IParser extends z.infer<typeof ZParser> {}
