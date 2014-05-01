/// <reference path="./Entity.ts" />
 
//抽象示例

var mysqlQuerier: Querier = new MysqlQuerier();
var data: Array<Entity> = mysqlQuerier.all(EntityName.user);

var testEntity: Entity = {
    getId(): any{
        return this.id;
    }
};
var testObj: EntityMetadata = EntityConfig.valueOf(EntityName.user, testEntity);