## Postgres Docker

Startup Docker Postgres

```
docker run --name pace-pg -e POSTGRES_PASSWORD=root -d -p 5433:5432 po
stgres
```

### posts table

```
CREATE TABLE posts (
	id serial PRIMARY KEY,
	title varchar(255) NOT NULL,
	body varchar,
	picture varchar,
	created_at timestamp,
	updated_at timestamp
);
```

### Users Table

```
CREATE TABLE users (
	user_id serial PRIMARY KEY,
	is_admin boolean
	username varchar(55) UNIQUE,
	email varchar UNIQUE,
	pass_hash varchar(255),
  token varchar,
	instagram_pass varchar,
	instagram_user varchar,
	created_at timestamp DEFAULT NOW()
);
```

### Inquiries

```
CREATE TABLE inquiries (
	inquiry_id serial PRIMARY KEY, body varchar(1000), email varchar(255) NOT NULL,
 phone varchar(255), first_name varchar(255) NOT NULL, last_name varchar(255) NOT NULL,
  created_at timestamp DEFAULT NOW() NOT NULL
	);
```
