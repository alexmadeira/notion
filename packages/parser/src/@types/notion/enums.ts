import { z } from 'zod'

import { SELECT_COLORS } from '~/constants/properties'

export const ZESelectColor = z.enum(SELECT_COLORS)

//
//
//

export type TESelectColor = z.infer<typeof ZESelectColor>
