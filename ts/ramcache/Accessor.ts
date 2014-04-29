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
    /***执行持久化*/
    persister(name: EntityName): void;
}

/**定时 数据持久化处理器*/
class TimerAccessor implements Accessor {
    //数据查询器
    private querier: Querier;
    //持久化监听器
    private persisterListeners: { [id: string]: any };

    //保存队列
    private saveQueue: { [id: string]: { [id: string]: Entity; }; } = {};
    //删除队列
    private removeQueue: { [id: string]: { [id: string]: any; } } = {};

    public save(name: EntityName, entity: Entity): void {
        this.addSaveQueue(name, entity);
    }
    /***更新实体*/
    public update(name: EntityName, entity: Entity): void {
        this.addSaveQueue(name, entity);
    }
    /***加载实体*/
    public load(name: EntityName, id: any): Entity {
        var data: any = this.querier.findOne(name, id);
        return data;
    }
    /***删除实体*/
    public remove(name: EntityName, entity: Entity): void {
        //直接删除
        this.querier.remove(name, entity.getId());
        this.addDelQueue(name, entity);
    }
    /***执行持久化*/
    persister(name: EntityName): void {
        var key: string = name + '';

        /*
        var removeIds: { [id: string]: any; } = this.removeQueue[key];
        this.removeQueue[key] = {};
        for (var id in removeIds) {
            this.querier.remove(name, id);
        }
        removeIds = null;
        */

        var saveIds: { [id: string]: Entity; } = this.saveQueue[key];
        this.saveQueue[key] = {};
        for (var data in saveIds) {
            this.querier.save(name, data);
        }
        saveIds = null;
    }

    /**注册实体持久化监听器*/
    public registerListener(name: EntityName, cacheConfig: CacheConfig): void {
        var key: string = name + '';
        var persisterListener: any = this.persisterListeners[key];
        var $this = this;
        if (persisterListener == null) {
            var value = name;
            persisterListener = setInterval(function() {
                $this.persister(value);
            }, cacheConfig.timeTirgger);
        }
    }
    public removeListener(name: EntityName): void {
        var key: string = name + '';
        var persisterListener: any = this.persisterListeners[key];
        if (persisterListener != null) {
            clearInterval(persisterListener);
            delete this.persisterListeners[key];
        }
    }



    /***构造方法*/
    public static valueOf(querier: Querier): TimerAccessor {
        var result: TimerAccessor = new TimerAccessor();
        result.querier = querier;
        return result;
    }

    //private
    private addSaveQueue(name: EntityName, entity: Entity): void {
        var key: string = name + "";
        var id: string = entity.getId();
        if (this.saveQueue[key] == null) {
            this.saveQueue[key] = {};
        }
        this.saveQueue[key][id] = entity;
    }


    private addDelQueue(name: EntityName, entity: Entity): void {
        var key: string = name + "";
        var id: string = entity.getId();

        if (this.saveQueue[key] == null) {
            return;
        }
        delete this.saveQueue[key][id];
        /*
       
        if (this.removeQueue[key] == null) {
            this.removeQueue[key] = {};
        }
        this.removeQueue[key][id] = 1;
        */
    }
}