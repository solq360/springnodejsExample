interface IBuildModule {
    dir: string;
    /**包类**/
    packName: string;
    /***模块名*/
    moduleName: string;

    buildClassProcessors: any;
    /***模块类型*/
    moduleType: string;
    author: string;
    name: string;
    /**扩展类*/
    extendClassNames: Array< { className: string; classType: string }>;

    /**创建文件*/
    callback: (fileName: string, body: string) => void;
    /**构建所有**/
    buildAll(): void;
    /**构建包头**/
    buildPackHead(): string;
    /**构建扩展类**/
    buildExtendClass(): void;
}



/**实现类*/
class BuildModule implements IBuildModule {
    /**包类**/
    packName: string;
    /***模块名*/
    moduleName: string;
    /***模块类型*/
    moduleType: string;
    buildClassProcessors: any;
    /**扩展类*/
    extendClassNames: Array< { className: string; classType: string }>;
    /**创建文件*/
    callback: (fileName: string, body: string) => void;

    dir: string;
    author: string;
    name: string;

    constructor(config: IBuildModule) {
        this.packName = config.packName;
        this.moduleName = config.moduleName;
        this.moduleType = config.moduleType
        this.extendClassNames = config.extendClassNames;
        this.callback = config.callback;
        this.dir = config.dir;
        this.buildClassProcessors = config.buildClassProcessors;
        this.author = config.author;
        this.name = config.name;
    }
    /**构建所有**/
    public buildAll(): void {
        this.buildExtendClass();
    }

    //////////////////////////////////private////////////////////////////////


    /**构建包头**/
    buildPackHead(): string {
        return this.packName + "." + this.moduleName + "." + this.moduleType;
    }

    /**构建扩展类**/
    buildExtendClass(): void {
        var packName = this.buildPackHead();
        var moduleName =  this.moduleName.charAt(0).toUpperCase()+ this.moduleName.substring(1) ;

        for (var i in this.extendClassNames) {
            var config: { className: string; classType: string } = this.extendClassNames[i],

                fileName: string = this.bulidFileName(config.className);

            var processor = this.buildClassProcessors[config.classType];
            var ctx = {
                className: config.className.replace(/\.java/mg, ''),
                packName: packName,
                fileName: fileName,
                author: this.author,
                name :this.name,
                moduleName: moduleName,
                moduleType: this.moduleType
            };

            var body = processor.processor(ctx);
            this.createFile(this.dir + fileName, body);
        }
    }

    /**创建文件*/
    createFile(fileName: string, body: string): void {
        this.callback(fileName, body);
    }

    /**生成文件名*/
    private bulidFileName(className: string): string {
        var pack = this.buildPackHead();
        return (pack + ".").replace(/\./img, "/").toLowerCase() + className;
    }

    //构造方法
    static valueOf(config: IBuildModule): BuildModule {
        var buildModule: BuildModule = new BuildModule(config);
        return buildModule;
    }
}
declare var module: any;
module.exports = BuildModule;