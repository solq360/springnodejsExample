/**数据持久化处理器*/
interface Accessor {
    /***保存实体*/
    save(name: EntityName, entity: Entity): void;
    /***更新实体*/
    update(name: EntityName, entity: Entity): void;
    /***加载实体*/
    load(name: EntityName, id: any): Entity;
    /***删除实体*/
    remove(name: EntityName, entity: Entity): void;
}