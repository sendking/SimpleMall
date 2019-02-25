const GoodsModel = require("../models/goods");
const { responseClient } = require("../util");

// 添加商品
exports.addGoods = async (req, res, next) => {
  const goods = new GoodsModel(req.body);
  const goodsInfo = await goods
    .save()
    .catch(e => responseClient(res, 201, "error", e));
  if (goodsInfo) {
    responseClient(res, 200, "success", goodsInfo);
  } else {
    responseClient(res, 201, "error");
  }
};

// 获取商品详情
exports.getGoods = async (req, res, next) => {
  if(!req.params.id){
    responseClient(res, 201, 'error', '无效请求')
  }

  const info = await GoodsModel.findById(id).catch(err => responseClient(res, 201, '服务器内部错误', err))
  if(info){
    responseClient(res, 200, 'success', info)
  }else{
    responseClient(res, 201, 'error', '查询失败')
  }
};

// 商品更新
exports.putGoods = async(res, res,next)=>{
  const {id} = req.params
  const {name,price,create_user,type} = req.body
  delete req.body.create_time
  delete req.body.update_time
  if(!id){
    responseClient(res, 201, 'error', '无效的请求')
  }
  if(!name || !price || !create_user || !type){
    responseClient(res, 201, 'error', '参数错误')
  }

  const info = await GoodsModel.findByIdAndUpdate(id, req.body).catch(err => responseClient(res, 201, '服务器内部错误', err))
  if(info){
    responseClient(res, 200, 'success', '商品更新成功')
  }else{
    responseClient(res, 201, 'error', '商品更新失败')
  }
}

// 商品上架、下架
exports.upperAndlowerGoods = async (req,res, next)=>{
  const {id, status} = req.params
  if(!id){
    responseClient(res, 201, 'error', '无效的请求')
  }

  const info = await GoodsModel.findByIdAndUpdate(id,{status:Number(status)}).catch(err => responseClient(res, 201, '服务器内部错误', err))
  if(info){
    responseClient(res, 200, 'success', '操作成功')
  }else{
    responseClient(res, 201, 'error', '操作失败')
  }
}

// 商品列表，正序、倒序
exports.getGoodsList = async(req,res, next)=>{
  const {
    page_num = 1,
    type,
    page_size = 10,
    status,
    price
  } = req.query
  const query = {}
  const options = {
    sort: {
      create_time:1
    },
    page: Number(page_num),
    limit: Number(page_size)
  }
  if(type) query.type = type
  if(status) query.status = status
  if(price) options.sort.price = price
  const list = await GoodsModel.paginate(query, options).catch(err => responseClient(res, 201, '服务器内部错误', err))
  responseClient(res, 200, 'success', list)
  next()
}

