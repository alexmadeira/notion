import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'

export type TPartialDatabaseResult = QueryDatabaseResponse['results'][number]

export type TDatabaseResult = Extract<
  TPartialDatabaseResult,
  { properties: unknown }
>

export type TNotionPageProperties = TDatabaseResult['properties']
export type TNotionPagePropertiesValues = TNotionPageProperties[string]

export type TNotionPropertyType = TNotionPagePropertiesValues['type']

export type TPartiaTitleResponse = Extract<
  TNotionPagePropertiesValues,
  { type: 'title' }
>

export type TPartialUserObjectResponse = Extract<
  TNotionPagePropertiesValues,
  { type: 'people' }
>['people']

export type TUserObjectResponse = Extract<
  PartialUserObjectResponse,
  { type: 'person' }
>
