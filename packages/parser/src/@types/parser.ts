import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { z } from 'zod'

export type PartialDatabaseResult = QueryDatabaseResponse['results'][number]

export type DatabaseResult = Extract<
  PartialDatabaseResult,
  { properties: unknown }
>

export type NotionPageProperties = DatabaseResult['properties']
export type NotionPagePropertiesValues = NotionPageProperties[string]

export type NotionPropertyType = NotionPagePropertiesValues['type']

export const ZParser = z.object({
  title: z.function().args(z.any()).returns(z.void()),
})

export interface IParser extends z.infer<typeof ZParser> {}
