import { Client as NotionClient } from '@notionhq/client'
import {
  CreatePageParameters,
  CreatePageResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  UpdatePageParameters,
  UpdatePageResponse,
} from '@notionhq/client/build/src/api-endpoints'

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
  ): Promise<QueryDatabaseResponse> {
    return await this._notion.databases.query({
      database_id: databaseId,
      filter: filter || this._filter,
      sorts: sorts || this._sorts,
      page_size: pageSize || this._pageSize,
      start_cursor: start,
    })
  }

  public async findFirst(
    databaseId: string,
    filter?: QueryDatabaseParameters['filter'],
    sorts?: QueryDatabaseParameters['sorts'],
  ): Promise<QueryDatabaseResponse> {
    return await this.findMany(databaseId, filter, sorts, 1)
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
