import {route, GET, POST} from 'awilix-express';
import container from '../container';

@route('/todo')
export default class TodoApi {
  constructor({}) {
    this.todoService = {
      getList: () => Promise.resolve([null, [{a:1}, {a:2}]])
    }
  }
  @route('/getTodoList')
  @GET()
  async getTodoList(req, res) {
    const [err, todolist] = await this.todoService.getList();
    if (err) {
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