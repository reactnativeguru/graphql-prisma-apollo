# Prisma Apollo Server 



## Getting started

1. Clone this repo
2. Run `npm install` to grab dependencies from npm.
3. Start prisma and database instance using `docker-compose up -d` (Run `yarn deploy -n` to use prisma demo servers)
4. Deploy the datamodel using `prisma deploy`
5. Start the server using `npm run dev`

(Use npm run start to run without watch mode)

examples mutations
mutation {
  register (username: "john", password:"time") {
    id
    username
  }
}



mutation {
  login(username:"john", password: "time"){
    token 
    user {
      id
      username
    }
  }
}
