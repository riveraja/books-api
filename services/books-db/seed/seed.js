"use strict";

const books = [
  {
    title: "Iron Flame",
    date_published: "2023-11-07",
    isbn: "978-1-64937-417-2",
    page_count: 623,
    publisher: "Red Tower Books (Entangled Publishing)",
    site_link: "https://www.entangledpublishing.com/about-us",
    author: "Rebecca Yarros",
    profile_link: "https://en.wikipedia.org/wiki/Rebecca_Yarros",
    img_link: "https://en.wikipedia.org/wiki/File:Iron_Flame_Cover_Art.jpg",
  },
  {
    title: "Spare",
    date_published: "2023-01-10",
    isbn: "978-0-59359-380-6",
    page_count: 416,
    publisher: "Penguin Random House",
    site_link: "https://en.wikipedia.org/wiki/Penguin_Random_House",
    author: "Prince Harry, The Duke of Essex",
    profile_link: "https://en.wikipedia.org/wiki/Prince_Harry,_Duke_of_Sussex",
    img_link: "https://en.wikipedia.org/wiki/File:Spare_cover.jpg",
  },
  {
    title: "Fourth Wing",
    date_published: "2023-04-05",
    isbn: "978-1-64937-404-2",
    page_count: 512,
    publisher: "Red Tower Books (Entangled Publishing)",
    site_link: "https://www.entangledpublishing.com/about-us",
    author: "Rebecca Yarros",
    profile_link: "https://en.wikipedia.org/wiki/Rebecca_Yarros",
    img_link: "https://en.wikipedia.org/wiki/File:Fourth_Wing_Cover_Art.jpeg",
  },
  {
    title: "The Woman In Me",
    date_published: "2023-10-23",
    isbn: "978-1-66800-904-8",
    page_count: 288,
    publisher: "Gallery Books",
    site_link: "https://en.wikipedia.org/wiki/Gallery_Publishing_Group",
    author: "Britney Spears",
    profile_link: "https://en.wikipedia.org/wiki/Britney_Spears",
    img_link:
      "https://en.wikipedia.org/wiki/File:Britney_Spears_-_The_Woman_in_Me.png",
  },
];

module.exports = async function ({ entities, db, sql }) {
  for (const values of books) {
    let author = {};
    let publisher = {};

    const author_info = {
      name: values.author,
      profile_link: values.profile_link,
    };

    const findAuthor = await entities.author.find({
      fields: ["id", "name"],
      where: { name: { like: values.author } },
      limit: 1,
    });

    // DEBUG ONLY
    // if (Object.entries(findAuthor).length !== 0) {
    //   console.log("findAuthor:", findAuthor[0]["id"]);
    // }

    if (Object.entries(findAuthor).length === 0) {
      author = await entities.author.save({ input: author_info });

      console.log("Create author:", author);
    }

    const publisher_info = {
      name: values.publisher,
      site_link: values.site_link,
    };

    const findPublisher = await entities.publisher.find({
      fields: ["id", "name"],
      where: { name: { like: values.publisher } },
      limit: 1,
    });

    // DEBUG ONLY
    // if (Object.entries(findPublisher).length !== 0) {
    //   console.log("findPublisher:", findPublisher[0]["id"]);
    // }

    if (Object.entries(findPublisher).length === 0) {
      publisher = await entities.publisher.save({
        input: publisher_info,
      });

      console.log("Created publisher:", publisher);
    }

    const book_info = {
      author_id: author.id != null ? author.id : findAuthor[0]["id"],
      publisher_id:
        publisher.id != null ? publisher.id : findPublisher[0]["id"],
      title: values.title,
      date_published: values.date_published,
      isbn: values.isbn,
      page_count: values.page_count,
      img_link: values.img_link,
    };

    const book = await entities.book.save({ input: book_info });

    console.log("Created book:", book);
  }
};
