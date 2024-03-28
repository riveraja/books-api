import type { PlatformaticApp, PlatformaticDBMixin, PlatformaticDBConfig, Entity, Entities, EntityHooks } from '@platformatic/db'
import { EntityTypes, Author,Book,Publisher } from './types'

declare module 'fastify' {
  interface FastifyInstance {
    getSchema<T extends 'Author' | 'Book' | 'Publisher'>(schemaId: T): {
      '$id': string,
      title: string,
      description: string,
      type: string,
      properties: {
        [x in keyof EntityTypes[T]]: { type: string, nullable?: boolean }
      },
      required: string[]
    };
  }
}

interface AppEntities extends Entities {
  author: Entity<Author>,
    book: Entity<Book>,
    publisher: Entity<Publisher>,
}

interface AppEntityHooks {
  addEntityHooks(entityName: 'author', hooks: EntityHooks<Author>): any
    addEntityHooks(entityName: 'book', hooks: EntityHooks<Book>): any
    addEntityHooks(entityName: 'publisher', hooks: EntityHooks<Publisher>): any
}

declare module 'fastify' {
  interface FastifyInstance {
    platformatic: PlatformaticApp<PlatformaticDBConfig> &
      PlatformaticDBMixin<AppEntities> &
      AppEntityHooks
  }
}
