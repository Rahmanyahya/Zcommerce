import redis from 'redis'
import { globalConfig } from 'src/infra/global.config'

const redisClient = await ( async () => {
    const client = redis.createClient({
        url: globalConfig.Redis.redis_connection
    })

    client.on('error', (err) => {
        console.error(`Error connecting to Redis: ${err}`)
    })

    client.connect()

    return client
})()

export { redisClient }

