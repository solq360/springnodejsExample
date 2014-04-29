/***
高速缓存服务
不考虑加锁情况下
*/
class RamCacheService {
    //    constructor() {
    //        throw new Error("Cannot new this class");
    //    }
    private entityMetadata: EntityMetadata;

    private accessor: Accessor;
    private querier: Querier;

    private cacheData: { [id: string]: Entity; } = {};
    private addCacheData(entity: Entity) {
        var id: string = entity.getId();
        this.cacheData[id] = entity;
    }

    private getCacheData(id: any): Entity {
        return this.cacheData[id];
    }

    private removeCacheData(entity: Entity) {
        var id: string = entity.getId();
        delete this.cacheData[id];
    }

    private initCacheData(): void {
        var name = this.entityMetadata.entityName;
        var cacheConfig: CacheConfig = this.entityMetadata.cacheConfig;
        if (cacheConfig.initCacheConfig != null) {
            var initCacheConfig: InitCacheConfig = cacheConfig.initCacheConfig;
            var datas: Array<Entity>;
            switch (initCacheConfig.initType) {
                case InitCacheType.ALL:
                    datas = this.querier.findAll(name);
                    break;
                case InitCacheType.QUERY:
                    datas = this.querier.find(name, initCacheConfig.queryValue);
                    break;
                default:
                    break;
            }
            for (var entity in datas) {
                this.addCacheData(entity);
            }
        }

        //注册持久化监听器
        this.accessor.persister(name);

    }

    /**公开方法 */
    /**构造 服务  */
    valueOf(accessor: Accessor, querier: Querier, entityMetadata: EntityMetadata): RamCacheService {
        var result: RamCacheService = new RamCacheService();
        result.accessor = accessor;
        result.querier = querier;
        result.entityMetadata = entityMetadata;
        result.initCacheData();
        return result;
    }
    /**加载或者创建实体 */
    loadOrCreate(id: any, callback: (id: any) => Entity): Entity {
        //cache > db 
        var resultEntity: Entity = this.getCacheData(id);
        var isSave :boolean =false;
        if (resultEntity == null) {
            var name = this.entityMetadata.entityName;
            resultEntity = this.accessor.load(name, id);
            isSave = true;
        }

        if (resultEntity == null) {
            resultEntity = callback(id);
            this.save(resultEntity);
        }
        if(isSave){
            this.addCacheData(resultEntity);
        }
        return resultEntity;
    }
    /**保存实体 */
    save(entity: Entity): void {
        var name = this.entityMetadata.entityName;
        this.accessor.save(name, entity);
        this.addCacheData(entity);
    }
    /**更新实体 */
    update(entity: Entity): void {
        this.save(entity);
    }
    /**删除实体 */
    remove(entity: Entity): void {
        var name = this.entityMetadata.entityName;
        this.accessor.remove(name, entity);
        this.removeCacheData(entity);
    }
    /**获取实体元数据 */
    getEntityMetadata(): EntityMetadata {
        return this.entityMetadata;
    }

    //private


}

declare var module: any;
module.exports = RamCacheService;