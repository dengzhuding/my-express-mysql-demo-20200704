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
  
  @route('/add')
  @POST()
  async add(req, res) {
    const {record_id, name} = req.body;
    const item = {
      recordId: record_id,
      name: name
    }
    if (!item.recordId) {
      item.recordId = Math.ceil(Math.random()*10)
    }
    if (!item.name) {
      res.json({
        success: false,
        message: '请传入name参数！',
        data: null
      });
      return
    }
    const { success, data, message } = await this.todoService.addTodoItem(item)
    if (!success) {
      res.json({
        success: false,
        message: message,
        data: null
      });
      return
    }
    res.json({
      success: true,
      message: '添加成功',
      data: data
    });
  }
}