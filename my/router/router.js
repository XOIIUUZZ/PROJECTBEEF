
let path = require('path');

// 引入上传图片模型
let formidable = require('formidable');

// 注册接口
let url = require('url');
let common = require('./common');
let sendEmail = require('./nodemailer');
let data = require('./sql');
let jwt =require('jsonwebtoken')
let query = require('./mysql')
let mysql = require('mysql')

let connect = mysql.createConnection({
    host:'192.168.97.233',
    user:'root',
    password:'root',
    database:'student2'
})
connect.connect()
// 创建数据库连接
module.exports = {
    /**
     * @description 获取商品列表信息
     * 调用函数：getSpecialfood(req,res)
     * @param req 请求数据
     * @param res 响应数据
     */

    //  特色菜品
    getSpecialfood(req,res) {
        // 查询数据库数据
        connect.query('select * from goods', function(err,data){
            if(!err){
                // 返回接口数据，并结束接口请求
                res.json({
                    status:200,
                    data:data
                })
            }else {
                res.json({
                    status:500,
                    data:[]
                })
            }
        })

    },

    // 店面形象企业荣誉
    getSpecialfood2(req,res) {
        // 查询数据库数据
        connect.query('select * from store', function(err,data){
            if(!err){
                // 返回接口数据，并结束接口请求
                res.json({
                    status:200,
                    data:data
                })
            }else {
                res.json({
                    status:500,
                    data:[]
                })
            }
        })

    },

    // 轮播图
    getSpecialfood3(req,res) {
        // 查询数据库数据
        connect.query('select * from planting', function(err,data){
            if(!err){
                // 返回接口数据，并结束接口请求
                res.json({
                    status:200,
                    data:data
                })
            }else {
                res.json({
                    status:500,
                    data:[]
                })
            }
        })

    },

    // 新闻与动态
    getSpecialfood4(req,res) {
        // 查询数据库数据
        connect.query('select * from trends', function(err,data){
            if(!err){
                // 返回接口数据，并结束接口请求
                res.json({
                    status:200,
                    data:data
                })
            }else {
                res.json({
                    status:500,
                    data:[]
                })
            }
        })

    },

    // 常见问题
    getSpecialfood5(req,res) {
        // 查询数据库数据
        connect.query('select * from problem', function(err,data){
            if(!err){
                // 返回接口数据，并结束接口请求
                res.json({
                    status:200,
                    data:data
                })
            }else {
                res.json({
                    status:500,
                    data:[]
                })
            }
        })

    },

    // 文章集合
    getSpecialfood6(req,res) {
        // 查询数据库数据
        connect.query('select * from collection', function(err,data){
            if(!err){
                // 返回接口数据，并结束接口请求
                res.json({
                    status:200,
                    data:data
                })
            }else {
                res.json({
                    status:500,
                    data:[]
                })
            }
        })

    },
    
    // 上传数据到数据库
    addGoods: function(req,res){
        // 获取请求的参数
        // 获取传入的form表单 解析地址传入的form表单
        let form = new formidable.IncomingForm();
    
        // 设置图片上传的地址
        form.uploadDir = './upload'
    
        // 保留图片的后缀名
        form.keepExtensions = true
    
        // 解析参数
        // fields 除了上传图片的其他数据
        // files 上传的文件
        form.parse(req,function(err,fields,files){
            
            // 将获取的参数写入数据库
            let filebase = path.parse(files.img.path).base
    
            let sql = 'insert into goods(name,img,class) values(?)'
            let data = [fields.name,filebase,fields.class]
            connect.query(sql,[data],function(err,data){
                if (!err) {
                    res.json({
                        status: 200,
                        data: ''
                    })
                }
            })
    
        })
    
    },

    addStore: function(req,res){
        // 获取请求的参数
        // 获取传入的form表单 解析地址传入的form表单
        let form = new formidable.IncomingForm();
    
        // 设置图片上传的地址
        form.uploadDir = './upload'
    
        // 保留图片的后缀名
        form.keepExtensions = true
    
        // 解析参数
        // fields 除了上传图片的其他数据
        // files 上传的文件
        form.parse(req,function(err,fields,files){
            
            // 将获取的参数写入数据库
            let filebase = path.parse(files.img.path).base
    
            let sql = 'insert into store(name,img,class) values(?)'
            let data = [fields.name,filebase,fields.class]
            connect.query(sql,[data],function(err,data){
                if (!err) {
                    res.json({
                        status: 200,
                        data: ''
                    })
                }
            })  
        })  
    },

    addJasm: function(req,res){
        // 获取请求的参数
        // 获取传入的form表单 解析地址传入的form表单
        let form = new formidable.IncomingForm();
    
        // 设置图片上传的地址
        form.uploadDir = './upload'
    
        // 保留图片的后缀名
        form.keepExtensions = true
    
        // 解析参数
        // fields 除了上传图片的其他数据
        // files 上传的文件
        form.parse(req,function(err,fields){
            
            // 将获取的参数写入数据库
            // let filebase = path.parse(files.img.path).base
    
            let sql = 'insert into trends(name,class,dates,bars,cont) values(?)'
            let data = [fields.name,fields.class,fields.dates,fields.bars,fields.cont]
            connect.query(sql,[data],function(err,data){
                if (!err) {
                    res.json({
                        status: 200,
                        data: ''
                    })
                }
            })
    
        })
    
    },

    addPlant: function(req,res){
        // 获取请求的参数
        // 获取传入的form表单 解析地址传入的form表单
        let form = new formidable.IncomingForm();
    
        // 设置图片上传的地址
        form.uploadDir = './upload'
    
        // 保留图片的后缀名
        form.keepExtensions = true
    
        // 解析参数
        // fields 除了上传图片的其他数据
        // files 上传的文件
        form.parse(req,function(err,fields,files){
            
            // 将获取的参数写入数据库
            let filebase = path.parse(files.img.path).base
    
            let sql = 'insert into planting(img) values(?)'
            let data = [filebase]
            connect.query(sql,[data],function(err,data){
                if (!err) {
                    res.json({
                        status: 200,
                        data: ''
                    })
                }
            })  
        })  
    },

    addProblem: function(req,res){
        // 获取请求的参数
        // 获取传入的form表单 解析地址传入的form表单
        let form = new formidable.IncomingForm();
    
        // 设置图片上传的地址
        form.uploadDir = './upload'
    
        // 保留图片的后缀名
        form.keepExtensions = true
    
        // 解析参数
        // fields 除了上传图片的其他数据
        // files 上传的文件
        form.parse(req,function(err,fields){
            
            // 将获取的参数写入数据库
            // let filebase = path.parse(files.img.path).base
    
            let sql = 'insert into problem(name,cont) values(?)'
            let data = [fields.name,fields.cont]
            connect.query(sql,[data],function(err,data){
                if (!err) {
                    res.json({
                        status: 200,
                        data: ''
                    })
                }
            })  
        })  
    },

    addCollection: function(req,res){
        // 获取请求的参数
        // 获取传入的form表单 解析地址传入的form表单
        let form = new formidable.IncomingForm();
    
        // 设置图片上传的地址
        form.uploadDir = './upload'
    
        // 保留图片的后缀名
        form.keepExtensions = true
    
        // 解析参数
        // fields 除了上传图片的其他数据
        // files 上传的文件
        form.parse(req,function(err,fields){
            
            // 将获取的参数写入数据库
            // let filebase = path.parse(files.img.path).base
    
            let sql = 'insert into collection(title,class,dates,detail) values(?)'
            let data = [fields.name,fields.class,fields.dates,fields.detail]
            connect.query(sql,[data],function(err,data){
                if (!err) {
                    res.json({
                        status: 200,
                        data: ''
                    })
                }
            })
    
        })
    
    },
    deleteGoods:function(req,res){
        let reqbody = req.body;
        console.log(reqbody.good)
        let sql = "delete from goods where id = ?"
        connect.query(sql,[reqbody.good],function(err,data){
            if(!err){
                res.json({
                    status:200,
                    data:''
                })
            }
        })    
},
deleteStore:function(req,res){
    let reqbody = req.body;
    console.log(reqbody.good)
    let sql = "delete from store where id = ?"
    connect.query(sql,[reqbody.good],function(err,data){
        if(!err){
            res.json({
                status:200,
                data:''
            })
        }
    })    
},
deleteJasm:function(req,res){
    let reqbody = req.body;
    console.log(reqbody.good)
    let sql = "delete from trends where id = ?"
    connect.query(sql,[reqbody.good],function(err,data){
        if(!err){
            res.json({
                status:200,
                data:''
            })
        }
    })    
},
deleteplant:function(req,res){
    let reqbody = req.body;
    console.log(reqbody.good)
    let sql = "delete from planting where id = ?"
    connect.query(sql,[reqbody.good],function(err,data){
        if(!err){
            res.json({
                status:200,
                data:''
            })
        }
    })    
},
deleteProblem:function(req,res){
    let reqbody = req.body;
    console.log(reqbody.good)
    let sql = "delete from problem where id = ?"
    connect.query(sql,[reqbody.good],function(err,data){
        if(!err){
            res.json({
                status:200,
                data:''
            })
        }
    })    
},
deleteCollection:function(req,res){
    let reqbody = req.body;
    console.log(reqbody.good)
    let sql = "delete from collection where id = ?"
    connect.query(sql,[reqbody.good],function(err,data){
        if(!err){
            res.json({
                status:200,
                data:''
            })
        }
    })    
}
}








