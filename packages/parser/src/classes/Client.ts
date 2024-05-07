import type {
  CreatePageParameters,
  CreatePageResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
  UpdatePageParameters,
  UpdatePageResponse,
} from '@notionhq/client/build/src/api-endpoints'

import { Client as NotionClient } from '@notionhq/client'

export class Client {
  private readonly _notion: NotionClient

  private readonly _pageSize?: number = 10000
  private readonly _filter?: QueryDatabaseParameters['filter']
  private readonly _sorts?: QueryDatabaseParameters['sorts']

  constructor(notionToken: string) {
    this._notion = new NotionClient({ auth: notionToken })
  }

  public async findMany(
    databaseId: string,
    filter?: QueryDatabaseParameters['filter'],
    sorts?: QueryDatabaseParameters['sorts'],
    pageSize?: number,
    start?: string,
  ) {
    const databaseResponse = await this._notion.databases.query({
      database_id: databaseId,
      filter: filter || this._filter,
      sorts: sorts || this._sorts,
      page_size: pageSize || this._pageSize,
      start_cursor: start,
    })

    return {
      pagination: {
        nextCursor: databaseResponse.next_cursor,
        hasMore: databaseResponse.has_more,
      },
      results: databaseResponse.results,
    }
  }

  public async findFirst(
    databaseId: string,
    filter?: QueryDatabaseParameters['filter'],
    sorts?: QueryDatabaseParameters['sorts'],
  ) {
    const databaseResponse = await this.findMany(databaseId, filter, sorts, 1)

    return {
      pagination: databaseResponse.pagination,
      result: databaseResponse.results[0],
    }
  }

  public async findUnique(pageId: string) {
    const databaseResponse = await this._notion.pages.retrieve({
      page_id: pageId,
    })

    return databaseResponse as PageObjectResponse
  }

  public async create(
    databaseId: string,
    properties: CreatePageParameters['properties'],
  ): Promise<CreatePageResponse> {
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
    listProperties: CreatePageParameters['properties'][],
  ): Promise<CreatePageResponse[]> {
    return await Promise.all(
      listProperties.map(async (properties) =>
        this.create(databaseId, properties),
      ),
    )
  }

  public async update(
    pageId: string,
    properties: UpdatePageParameters['properties'],
  ): Promise<UpdatePageResponse> {
    return await this._notion.pages.update({
      page_id: pageId,
      properties,
    })
  }

  public async delete(pageId: string): Promise<UpdatePageResponse> {
    return await this._notion.pages.update({
      page_id: pageId,
      in_trash: true,
    })
  }
}
