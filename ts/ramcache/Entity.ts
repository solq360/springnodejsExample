/***实体*/
interface Entity {
    getId(): any;
};
/***实体元信息*/
interface EntityMetadata {
    entityName: EntityName;
    entity: Entity;
    cacheConfig?: CacheConfig;
}
/***实体映射表*/
class EntityName {
    static user: string = "user";
}

class EntityConfig {
    static valueOf(entityName: EntityName, entity: Entity, cacheConfig?: CacheConfig): EntityMetadata {
        var result: EntityMetadata = {
            entityName: entityName,
            entity: entity,
            cacheConfig: cacheConfig,
        };
        return result;
    }
}


declare var module: any;
module.exports = EntityConfig;

declare var global: any;
global.EntityName = EntityName;