import { Author } from './Author'
import { Book } from './Book'
import { Publisher } from './Publisher'
  
interface EntityTypes  {
  Author: Author
    Book: Book
    Publisher: Publisher
}
  
export { EntityTypes, Author, Book, Publisher }