import { z } from 'zod'

import { SELECT_COLORS, SUPPORTED_PROPERTIES } from '~/constants/properties'

export const ZESelectColor = z.enum(SELECT_COLORS)
export const ZESupportedProperties = z.enum(SUPPORTED_PROPERTIES)

//
//
//

export type TESelectColor = z.infer<typeof ZESelectColor>
export type TESupportedProperties = z.infer<typeof ZESupportedProperties>
