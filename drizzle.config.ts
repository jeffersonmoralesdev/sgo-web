import {defineConfig} from "drizzle-kit"

export default  defineConfig({
    out:'./src/db/drizzle/migrations',
    schema:'./src/db/drizzle/schema/index.ts',
    dialect:'mysql',
    dbCredentials:{
        url:process.env.DATABASE_URL!,
    }
})