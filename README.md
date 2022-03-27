## Postgres Docker
Startup Docker Postgres
```
docker run --name pace-pg -e POSTGRES_PASSWORD=root -d -p 5433:5432 po
stgres
```
add posts table

```
CREATE TABLE posts (
	id serial PRIMARY KEY,
	title varchar(255) NOT NULL,
	body varchar,
	picture varchar,
	created_at timestamp,
	updated_at timestamp
);
CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username varchar(55) UNIQUE,
	pass_hash varchar(255),
  token varchar,
	instagram_pass varchar,
	instagram_user varchar,
	created_at timestamp DEFAULT NOW()
);
```
