import type {
  IClient,
  TResponseDatabaseResult,
  TResponsePage,
} from '@/classes/client'
import type {
  TCreatePageProperties,
  TQueryFirstOptions,
  TQueryOptions,
  TUpdatePageProperties,
} from '@/hacks/notion'

import { Client as NotionClient } from '@notionhq/client'

export class Client implements IClient {
  private readonly _notion: NotionClient

  private readonly _queryOptions: TQueryOptions = {}

  constructor(notionToken: string) {
    this._notion = new NotionClient({ auth: notionToken })
  }

  public async findMany(databaseId: string, queryOptions: TQueryOptions = {}) {
    const options = { ...this._queryOptions, ...queryOptions }

    const databaseResponse = await this._notion.databases.query({
      database_id: databaseId,
      filter: options.filter,
      sorts: options.sorts,
      page_size: options.pageSize,
      start_cursor: options.start,
    })

    return {
      pagination: {
        nextCursor: databaseResponse.next_cursor,
        hasMore: databaseResponse.has_more,
      },
      results: databaseResponse.results as TResponseDatabaseResult[],
    }
  }

  public async findFirst(
    databaseId: string,
    queryOptions: TQueryFirstOptions = {},
  ) {
    const options = { ...this._queryOptions, ...queryOptions }

    const databaseResponse = await this.findMany(databaseId, options)

    return databaseResponse.results[0]
  }

  public async findUnique(pageId: string) {
    const databaseResponse = await this._notion.pages.retrieve({
      page_id: pageId,
    })

    return databaseResponse as TResponsePage
  }

  public async create(databaseId: string, properties: TCreatePageProperties) {
    return await this._notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: databaseId,
      },
      properties,
    })
  }

  public async createMany(
    databaseId: string,
    listProperties: TCreatePageProperties[],
  ) {
    return await Promise.all(
      listProperties.map(async (properties) =>
        this.create(databaseId, properties),
      ),
    )
  }

  public async update(pageId: string, properties: TUpdatePageProperties) {
    return await this._notion.pages.update({
      page_id: pageId,
      properties,
    })
  }

  public async delete(pageId: string) {
    return await this._notion.pages.update({
      page_id: pageId,
      in_trash: true,
    })
  }
}
