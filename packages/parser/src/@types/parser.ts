import { z } from 'zod'

import {
  ZPropertieCheckbox,
  ZPropertieDate,
  ZPropertieEmail,
  ZPropertieMultiSelect,
  ZPropertieNumber,
  ZPropertieRichText,
  ZPropertieSelect,
  ZPropertieSelectContent,
  ZPropertieTitle,
  ZPropertieUrl,
} from './properties'

export const ZNotImplementedFunction = z.function().args().returns(z.void())

export const ZParser = z.object({
  title: z.function().args(ZPropertieTitle).returns(z.string()),
  number: z.function().args(ZPropertieNumber).returns(z.number()),
  checkbox: z.function().args(ZPropertieCheckbox).returns(z.boolean()),
  rich_text: z.function().args(ZPropertieRichText).returns(z.string()),
  url: z.function().args(ZPropertieUrl).returns(z.string()),
  email: z
    .function()
    .args(ZPropertieEmail)
    .returns(z.union([z.string().email(), z.null()])),
  multi_select: z
    .function()
    .args(ZPropertieMultiSelect)
    .returns(z.array(ZPropertieSelectContent)),
  date: z
    .function()
    .args(ZPropertieDate)
    .returns(z.union([z.date(), z.null()])),
  select: z
    .function()
    .args(ZPropertieSelect)
    .returns(z.union([ZPropertieSelectContent, z.null()])),

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
