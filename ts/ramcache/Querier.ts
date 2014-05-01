/***查询器*/
interface Querier {
    /**查询所有数据**/
    all(name: EntityName): Array<Entity>;
    /**查询指定数据**/
    query(name: EntityName, queryName: string): Array<Entity>;
}
class MysqlQuerier implements Querier {
    all(name: EntityName): Array<Entity> {
        return [];
    }
    query(name: EntityName, queryName: string): Array<Entity> {
        return [];
    }
}

declare var module: any;
module.exports = MysqlQuerier;