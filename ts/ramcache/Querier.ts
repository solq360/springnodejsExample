/***查询器*/
interface Querier {
    /**保存数据**/
    save(name: EntityName, entity: Entity): void;
    /**查询指定数据**/
    findOne(name: EntityName, id: any): Entity;
    /**查询所有数据**/
    findAll(name: EntityName): Array<Entity>;
    /**查询指定数据**/
    find(name: EntityName, ...queryParams: Array<any>): Array<Entity>;
    /**删除数据**/
    remove(name: EntityName, id: any): void;
}
/***mysql*/
interface MySqlIConnection {
    query(sql: string, callback: (err: any, rows: any, fields: any) => void): void;
}
class MysqlQuerier implements Querier {
    /**查询SQL模板*/
    private static query_all_tpl: string = "SELECT * FROM {name}";

    /**数据库连接对象*/
    private connection: MySqlIConnection;


    save(name: EntityName, entity: Entity): void {

    }
    findOne(name: EntityName, id: any): any {
        return {};
    }
    findAll(name: EntityName): Array<Entity> {
        var result: Array<Entity> = [];

        var sql: string = MysqlQuerier.query_all_tpl;

        this.connection.query(sql, function(err, rows, fields) {
            if (err) throw err;
            for (var i in rows) {
                
            }
            console.log('value 2', rows);
        });
        return result;
    }
    find(name: EntityName, ...queryParams: Array<any>): Array<Entity> {
        return [];
    }

    remove(name: EntityName, id: any): void {

    }
    
    
    //private
    
    
}

declare var module: any;
module.exports = MysqlQuerier;