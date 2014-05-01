//http://blog.csdn.net/jilongliang/article/details/21942911
//动态类
class Greeter2 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

//模块 + 静态类
module ExampleModule {
    export class MyClass {
        constructor() {
            throw new Error("Cannot new this class");
        }

        static myProp:String;

        static doSomething() : string {
            return "World";
        }
    }
}
 
