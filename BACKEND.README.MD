# Backend

## function to use in Chrome console for debugging

```javascript
fetch("/posts/25", {
  method: "DELETE",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    userId: 1,
    token: "yourtoken",
  }),
})
  .then(result => {
    console.log(result);
    return result.json();
  })
  .then(data => console.log(data));

// login
fetch("/users/login", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    username: "admin",
    password: "pass",
  }),
})
  .then(result => {
    console.log(result);
    return result.json();
  })
  .then(data => console.log(data));
```

## Default Env Settings

```
MODE=development
PORT=8081
DB_HOST=localhost
DB_PORT=5433
DB_PASS=root
DB_USER=postgres
DB_NAME=postgres
TOKEN_KEY=secretkey
SALT=10
RECEIVER_EMAIL=mayeraus@icloud.com
MAILGUN_KEY=6ab17df5ee912ac97919b83814d8ae96-8ed21946-90b754d2
MAILGUN_DOMAIN=sandbox855f632013ac4f6a97f988fc94fdbb24.mailgun.org
NEXT_SERVER_URL=http://localhost:3000

```

## Postgres Docker

It is suggested to use pgAdmin when working with the database.

### Startup Docker Postgres

```
docker run --name pace-pg -e POSTGRES_PASSWORD=root -d -p 5433:5432 postgres
```

### posts table

```
CREATE TABLE posts (
	id serial PRIMARY KEY,
	title varchar(255) NOT NULL,
	body varchar,
	created_at timestamp,
	updated_at timestamp
);
```

### images table

```
CREATE TABLE images
(
	img_id serial PRIMARY KEY,
	img_name varchar(255) NOT NULL,
	img bytea,
	post_id int,
	FOREIGN KEY (post_id) REFERENCES posts(id)
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
	instagram_pass varchar,
	instagram_user varchar,
	created_at timestamp DEFAULT NOW()
);
```

### Inquiries

```
CREATE TABLE inquiries (
	inquiry_id serial PRIMARY KEY, body varchar(1000), email varchar(255) NOT NULL,
 phone varchar(255), first_name varchar(255) NOT NULL, last_name varchar(255) NOT NULL, viewed boolean NOT NULL DEFAULT FALSE
  created_at timestamp DEFAULT NOW() NOT NULL
	);
```

### All

```
CREATE TABLE posts (
	id serial PRIMARY KEY,
	title varchar(255) NOT NULL,
	body varchar,
	created_at timestamp,
	updated_at timestamp
);
CREATE TABLE images
(
	img_id serial PRIMARY KEY,
	img_name varchar(255) NOT NULL,
	img bytea,
	post_id int,
	FOREIGN KEY (post_id) REFERENCES posts(id)
);
CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username varchar(55) UNIQUE,
	email varchar UNIQUE,
	pass_hash varchar(255),
	instagram_pass varchar,
	instagram_user varchar,
	created_at timestamp DEFAULT NOW()
);
CREATE TABLE inquiries (
	inquiry_id serial PRIMARY KEY, body varchar(1000), email varchar(255) NOT NULL,
 phone varchar(255), first_name varchar(255) NOT NULL, last_name varchar(255) NOT NULL, viewed boolean NOT NULL DEFAULT FALSE,
  created_at timestamp DEFAULT NOW() NOT NULL
	);
```

### Loading Default Backup

Use pgAdmin to restore the dump saved in /database/backup.sql

## Heroku Deploy 手順

1. docker build -t mayeraus/pace-backend:amd64 --platform linux/amd64 .
2. docker tag mayeraus/pace-backend:amd64 registry.heroku.com/okinawa-pace-backend/web
3. docker push registry.heroku.com/okinawa-pace-backend/web
