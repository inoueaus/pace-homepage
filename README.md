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
PORT=8080
DB_HOST=localhost
DB_PORT=5433
DB_PASS=root
DB_USER=postgres
DB_NAME=postgres
TOKEN_KEY=secretkey
SALT=10

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

### Loading Default Backup

Use pgAdmin to restore the dump saved in /database/backup.sql
