import {createContainer, InjectionMode} from 'awilix';

// 创建容器
const container = createContainer({
  InjectionMode: InjectionMode.PROXY
})
export default container