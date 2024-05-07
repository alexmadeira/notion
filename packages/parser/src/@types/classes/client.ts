import type {
  TCreatePageProperties,
  TQueryOptions,
  TResponseCreatePage,
  TUpdatePageProperties,
} from '@/hacks/notion'
import type {
  DatabaseObjectResponse,
  PageObjectResponse,
  UpdatePageResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type TPagination = {
  nextCursor: string | null
  hasMore: boolean
}

export type TResponseDatabaseResult = DatabaseObjectResponse
export type TResponseUpdatePageResult = UpdatePageResponse

export type TResponseDatabase = {
  pagination: TPagination
  results: TResponseDatabaseResult[]
}

export type TResponsePage = PageObjectResponse

export interface IClient {
  create(
    databaseId: string,
    properties: TCreatePageProperties,
  ): Promise<TResponseCreatePage>
  createMany(
    databaseId: string,
    listProperties: TCreatePageProperties[],
  ): Promise<TResponseCreatePage[]>
  findMany(
    databaseId: string,
    options?: TQueryOptions,
  ): Promise<TResponseDatabase>
  findFirst(
    databaseId: string,
    options?: Omit<TQueryOptions, 'pageSize' | 'start'>,
  ): Promise<TResponseDatabaseResult>
  findUnique(
    pageId: string,
    properties: TUpdatePageProperties,
  ): Promise<TResponsePage>
  update(
    pageId: string,
    properties: TUpdatePageProperties,
  ): Promise<TResponseUpdatePageResult>
  delete(pageId: string): Promise<TResponseUpdatePageResult>
}
