import { z } from 'zod'

import { SELECT_COLORS } from './consantas'

export const ZESelectColor = z.enum(SELECT_COLORS)

export const ZPropertieTextContent = z.object({
  type: z.literal('text'),
  text: z.object({
    content: z.string(),
  }),
  plain_text: z.string(),
})

export const ZPropertieSelectContent = z.object({
  id: z.string(),
  name: z.string(),
  color: ZESelectColor.optional(),
})

export const ZPropertieTitle = z.object({
  id: z.string(),
  type: z.literal('title'),
  title: z.array(ZPropertieTextContent),
})

export const ZPropertieRichText = z.object({
  id: z.string(),
  type: z.literal('rich_text'),
  rich_text: z.array(ZPropertieTextContent),
})

export const ZPropertieDate = z.object({
  id: z.string(),
  type: z.literal('date'),
  date: z.object({
    start: z.string(),
  }),
})

export const ZPropertieNumber = z.object({
  id: z.string(),
  type: z.literal('number'),
  number: z.coerce.number(),
})

export const ZPropertieCheckbox = z.object({
  id: z.string(),
  type: z.literal('checkbox'),
  checkbox: z.coerce.boolean(),
})

export const ZPropertieSelect = z.object({
  id: z.string(),
  type: z.literal('select'),
  select: ZPropertieSelectContent.optional(),
})

export const ZPropertieMultiSelect = z.object({
  id: z.string(),
  type: z.literal('multi_select'),
  multi_select: z.array(ZPropertieSelectContent).optional(),
})

export const ZPropertieUrl = z.object({
  id: z.string(),
  type: z.literal('url'),
  url: z.string(),
})
export const ZPropertieEmail = z.object({
  id: z.string(),
  type: z.literal('url'),
  email: z.string().email(),
})

//
//
//

export type TESelectColor = z.infer<typeof ZESelectColor>

export type TPropertieText = z.infer<typeof ZPropertieTextContent>
export type TPropertieSelectContent = z.infer<typeof ZPropertieSelectContent>

export type TPropertieTitle = z.infer<typeof ZPropertieTitle>
export type TPropertieRichText = z.infer<typeof ZPropertieRichText>
export type TPropertieDate = z.infer<typeof ZPropertieDate>
export type TPropertieNumber = z.infer<typeof ZPropertieNumber>
export type TPropertieCheckbox = z.infer<typeof ZPropertieCheckbox>
export type TPropertieSelect = z.infer<typeof ZPropertieSelect>
export type TPropertieMultiSelect = z.infer<typeof ZPropertieMultiSelect>
export type TPropertieUrl = z.infer<typeof ZPropertieUrl>
export type TPropertieEmail = z.infer<typeof ZPropertieEmail>

// {
//   "properties": {
//     "Title": {
//       "id": "title",
//       "type": "title",
//       "title": [
//         {
//           "type": "text",
//           "text": {
//             "content": "A better title for the page",
//             "link": null
//           },
//           "annotations": {
//             "bold": false,
//             "italic": false,
//             "strikethrough": false,
//             "underline": false,
//             "code": false,
//             "color": "default"
//           },
//           "plain_text": "This is also not done",
//           "href": null
//         }
//       ]
//     }
//   }
// }
