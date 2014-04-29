/***查询器*/
interface Querier {
    /**保存数据**/
    save(name: EntityName, entity: Entity): void;
    /**查询指定数据**/
    findOne(name: EntityName, id: any): Entity;
    /**查询所有数据**/
    findAll(name: EntityName): Array<Entity>;
    /**查询指定数据**/
    find(name: EntityName, sql: string, ...queryParams: Array<any>): Array<Entity>;
    /**删除数据**/
    remove(name: EntityName, ...ids: Array<any>): void;
}
/***mysql*/
interface MySqlIConnection {
    query(sql: string, callback: (err: any, rows: any, fields: any) => void): any;
    query(sql: string, params: Array<any>, callback: (err: any, results: any) => void): any;
}
class MysqlQuerier implements Querier {
    /**查询SQL模板*/
    private static sql_all: string = "SELECT * FROM ??";
    private static sql_one: string = "SELECT * FROM ?? WHERE ??= ? ";
    private static sql_remove: string = "DELETE FROM ?? WHERE ??= ? ";
    private static sql_remove_bat: string = "DELETE FROM ?? WHERE ?? in ? ";

    private static sql_save: string = "REPLACE INTO ?? SET ?";

    /**数据库连接对象*/
    private connection: MySqlIConnection;

    save(name: EntityName, entity: Entity): void {
        var sql: string = MysqlQuerier.sql_save;
        var params = [name, entity];
        this._find(sql, params, false);
        // return entity;
    }
    findOne(name: EntityName, id: any): any {
        var sql: string = MysqlQuerier.sql_one;
        var params = [name, "id", id];
        var result: Array<Entity> = this._find(sql, params, true);
        if (result == null || result.length == 0) {
            return null;
        }
        return result[0];
    }
    findAll(name: EntityName): Array<Entity> {
        var sql: string = MysqlQuerier.sql_all;
        var params = [name];
        return this._find(sql, params, true);
    }
    find(name: EntityName, sql: string, ...queryParams: Array<any>): Array<Entity> {
        return this._find(sql, queryParams, true);
    }
    remove(name: EntityName, ...ids: Array<any>): void {
        var params = [name, "id", ids];
        var sql: string = MysqlQuerier.sql_remove_bat;
        if (ids.length == 1) {
            sql = MysqlQuerier.sql_remove;
        }
        this._find(sql, params, false);
    }


    //private
 
    private _find(sql: string, params: Array<any>, isResult: boolean): Array<Entity> {
        var result: Array<Entity> = [];
        this.connection.query(sql, params, function(err, results) {
            if (err) throw err;
            if (!isResult) {
                return;
            }

            result = results;
            /*
            for (var i in results) {

            }
            console.log('value 2', results);*/
        });

        return result;
    }

}

declare var module: any;
module.exports = MysqlQuerier;