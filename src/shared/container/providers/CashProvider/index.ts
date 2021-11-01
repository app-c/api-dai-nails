import { container } from "tsyringe";
import RedisCacheProvider from "./implementations/RedisCachProvider";
import ICacheProvider from "./models/ICachProvider";

const providers = {
   redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>("CacheProvider", providers.redis);
