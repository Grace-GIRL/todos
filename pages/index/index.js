//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 文本框的数据模型
    input:'',
    // 任务清单的数据模型
    todos:[
      { name:'learning html',completed:false},
      { name: 'learning css', completed: true },
      { name: 'learning javascript', completed: false },
    ],
    leftCount:2,
    allCompleted:false
  },
  inputChangeHandler: function (e) {
    this.setData({input:e.detail.value})
  },
  addTodoHandler: function () {
    if(!this.data.input) return;
    var todos=this.data.todos;
    todos.push({
      name:this.data.input,
      completed:false,

    }),
    this.setData({todos:todos,input:'',leftCount:this.data.leftCount+1})
  },
  toggleTodoHandler(e){
    var item=this.data.todos[e.currentTarget.dataset.index]
    item.completed=!item.completed
    var leftCount=this.data.leftCount + (item.completed? -1:1)
    this.setData({todos:this.data.todos,leftCount:leftCount})
  },
  removeTodoHandler(e){
    var todos=this.data.todos
    var item=todos.splice(e.currentTarget.dataset.index,1)[0];
    var leftCount = this.data.leftCount + (item.completed ? 0 : -1)
    this.setData({todos:todos,leftCount:leftCount})
  },
  toggleAllHandler(){
    this.data.allCompleted=!this.data.allCompleted
    var todos=this.data.todos
    var that=this
    todos.forEach(function(item){
      item.completed = that.data.allCompleted
    })
    var leftCount = this.data.allCompleted ? 0 : todos.length
    this.setData({todos:todos,leftCount:leftCount})
  },
  clearHandle(){
    var todos=this.data.todos.filter(function(item){
      return !item.completed
    })
    this.setData({todos:todos})
  },




  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
