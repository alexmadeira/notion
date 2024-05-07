import type {
  CreatePageParameters,
  CreatePageResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'

export type TResponseCreatePage = CreatePageResponse
export type TCreatePageProperties = CreatePageParameters['properties']
export type TUpdatePageProperties = UpdatePageParameters['properties']

export type TQueryDatabaseFilter = QueryDatabaseParameters['filter']
export type TQueryDatabaseSorts = QueryDatabaseParameters['sorts']

export type TQueryOptions = {
  filter?: TQueryDatabaseFilter
  sorts?: TQueryDatabaseSorts
  pageSize?: number
  start?: string
}

export type TQueryFirstOptions = Omit<TQueryOptions, 'pageSize' | 'start'>
