import { z } from 'zod'

import { ZSchemaValues } from './schema'

export const ZParser = z.object({
  queryDatabase: z.function().args(z.any()).returns(z.void()),
  schemaToNotion: z.function().args(ZSchemaValues).returns(z.void()),
})
export interface IParser extends z.infer<typeof ZParser> {}
