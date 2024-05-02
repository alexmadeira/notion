import { z } from 'zod'

export const ZSchema = z.object({})

export interface ISchema extends z.infer<typeof ZSchema> {}
