-- Create the authors table
CREATE TABLE IF NOT EXISTS authors (
    id UUID DEFAULT (gen_random_uuid()) PRIMARY KEY,
    name TEXT NOT NULL,
    profile_link TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the publishers table
CREATE TABLE IF NOT EXISTS publishers (
    id UUID DEFAULT (gen_random_uuid()) PRIMARY KEY,
    name TEXT NOT NULL,
    site_link TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the books table
CREATE TABLE IF NOT EXISTS books (
    id UUID DEFAULT (gen_random_uuid()) PRIMARY KEY,
    author_id UUID,
    publisher_id UUID,
    name TEXT NOT NULL,
    date_published DATE NOT NULL,
    isbn10 BIGINT,
    page_count INTEGER,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_author_id FOREIGN KEY(author_id) REFERENCES authors(id),
    CONSTRAINT fk_publisher_id FOREIGN KEY(publisher_id) REFERENCES publishers(id)
);
