# how to run

## prerequisites

- pnpm
- docker

## setup

1. run `pnpm install`
2. create `.env` file in the root of the project. refer to `.env.example` for the required variables
3. spin up mysql container using docker
4. run migrations. refer to #running-migrations and #db sections for more info
5. run `pnpm dev` to start the server
