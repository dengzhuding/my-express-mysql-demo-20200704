/**
 * 3种生命周期LifeTime（
 * TRANSIENT-默认-每次用到打偶会解析，class每次会生成新实例
 * SCOPE-在相同scope及相同container容器将会重用，即相同scope调用class是同一个实例
 * SINGLETON-总是重用，缓存在根容器
 * ）
 * 
 * 2种解析分案InjectMode（
 * PROXY-默认-对象注入
 * CLISSIC-解析参数，需要参数和注入时的名称一致，不能压缩代码改变名称
 * ）
 * 
**/
const awilix = require('awilix');
const {createContainer, Lifetime, asClass, asFunction, asValue, InjectionMode} = awilix;

const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

class MessageService {
  constructor({testVal}) {
    this.test = testVal
  }
  getTest () {
    return this.test
  }
  setTest (newVal) {
    this.test = newVal || ''
  }
}
container.register('messageService', asClass(MessageService, {lifetime: Lifetime.SCOPED}));
container.register('testVal', asValue('123456'));
let count = 1;
container.register({
  counterValye: asFunction(() => {
    console.log('here is scoped.')
    return count++
  }).transient()
})
const scope1 = container.createScope();
const scope2 = container.createScope();

console.log('scope1.cradle.counterValye:', scope1.cradle.counterValye);
console.log('scope1.cradle.counterValye:', scope1.cradle.counterValye);
console.log('scope2.cradle.counterValye:', scope2.cradle.counterValye);
console.log('scope2.cradle.counterValye:', scope2.cradle.counterValye);

const scope1_child = scope1.createScope();
console.log('scope1_child.cradle.counterValye:', scope1_child.cradle.counterValye);
console.log('scope1_child.cradle.counterValye:', scope1_child.cradle.counterValye);
