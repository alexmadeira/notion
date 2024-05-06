import { z } from 'zod'

export const ZParser = z.object({
  queryDatabase: z.function().args(z.any()).returns(z.void()),
})
export interface IParser extends z.infer<typeof ZParser> {}
