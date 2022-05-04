# About this Project

The purpose of this project is to build a website for the Pace Coffee farm in Nago, Okinawa.

# License

This project is unlicensed.

# Getting Started

## Frontend

```
cd frontend
yarn install
yarn dev
```

## Backend

```
docker run --name pace-db -e POSTGRES_PASSWORD=root -d postgres
cd backend/
yarn install
yarn dev
```

# Deployment

## Frontend

### Local

```
docker build -t mayeraus/pace-frontend:amd64 --platform linux/amd64 .
docker push mayeraus/pace-frontend:amd64
```

### EC2 Shell

Setup environment variables for frontend

```
touch frontend.env
vim frontend.env
```

Pull latest image and start

```
docker pull mayeraus/pace-frontend:amd64
docker run --env-file frontend.env -p 8080:3000 -d mayeraus/pace-frontend:amd64
```

## Backend

### Local

```
docker build -t mayeraus/pace-backend:amd64 --platform linux/amd64 .
docker push mayeraus/pace-backend:amd64
```

### EC2 Shell

Create Env file if necessary

```
touch backend.env
vim backend.env
```

Pull latest image and run

```
docker pull mayeraus/pace-backend:amd64
docker run -p 9000:8080 -d --rm --env-file backend.env mayeraus/pace-backend:amd64

```
