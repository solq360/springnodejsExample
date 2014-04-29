/***
    缓存配置
    队列+实时
*/
interface CacheConfig {
    //最大队列
    maxQueueLength: number;
    //触发持久化时间
    timeTirgger: number;
    //初始化配置
    initCacheConfig?: InitCacheConfig;
}
/**初始化配置**/
interface InitCacheConfig {
    //初始化类型
    initType: InitCacheType;
    //查询语句
    queryValue?: string;
}

class InitCacheType {
    static NOT: string = "NOT";
    static ALL: string = "ALL";
    static QUERY: string = "QUERY";
}

class DefaultInitCacheConfig {

    static valueOf(initType: InitCacheType = InitCacheType.NOT, queryValue?: string): InitCacheConfig {
        var config: InitCacheConfig = {
            initType: initType,
            queryValue: queryValue
        };
        return config;
    }
}
class DefaultCacheConfig {

    static config: CacheConfig;
    static valueOf(initCacheConfig?: InitCacheConfig, maxQueueLength?: number, timeTirgger?: number): CacheConfig {
        var config: CacheConfig = {
            maxQueueLength: maxQueueLength || 5000,
            timeTirgger: timeTirgger || 15 * 1000,
            initCacheConfig: (initCacheConfig || DefaultInitCacheConfig.valueOf())
        };
        return config;
    }
}
DefaultCacheConfig.config = DefaultCacheConfig.valueOf();

declare var module: any;
module.exports = DefaultCacheConfig;