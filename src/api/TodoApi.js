import {route, GET, POST} from 'awilix-express';
import container from '../container';

@route('/todo')
export default class TodoApi {
  constructor({todoService}) {
    // this.todoService = {
    //   getList: () => Promise.resolve([null, [{a:1}, {a:2}]])
    // }
    this.todoService = todoService
  }
  @route('/getTodoList')
  @GET()
  async getTodoList(req, res) {
    
    const { success, data: todolist, message } = await this.todoService.getList();
    // const [err, todolist] = await this.todoService.getList();
    if (!success) {
      res.json({
        success: false,
        message: '服务器错误，请联系管理员！',
        data: null
      });
      return
    }
    
    res.json({
      success: true,
      message: '查询成功',
      data: todolist
    });
  }
}