/*
 * @Author: jhd
 * @Date: 2019-01-15 13:06:23
 * @Description: 商品 controller
 */
const GoodsModel = require('../models/goods.model');
const { responseClient } = require('../util/util');

/**
 * @description: 添加商品
 */
exports.addGoods = async(req, res, next) => {
  let goods = new GoodsModel(req.body);
  const goodsInfo = await goods.save().catch(e => responseClient(res, 201, 'error', e));
  if (goodsInfo) {
    responseClient(res, 200, 'success', goodsInfo)
  } else {
    responseClient(res, 201, 'error')
  }
}
/**
 * @description: 获取商品详情
 * @param {type} 
 * @return: 
 */
exports.getGood = async (req, res, next) => {
  let { id } = req.params
  if (!id) {
    responseClient(res, 201, 'error', '无效的请求')
  }
  const info = await GoodsModel.findById(id).catch( err => responseClient(res, 201, '服务器内部错误', err))
  if (info) {
    responseClient(res, 200, 'success', info)
  } else {
    responseClient(res, 201, 'error', '查询失败')
  }
}
/**
 * @description: 商品更新
 * @param {type} 
 * @return: 
 */
exports.putGoods = async (req, res, next) => {
  let { id } = req.params
  let { name, price, create_user, type } = req.body
  delete req.body.create_time
  delete req.body.update_time
  if (!id) {
    responseClient(res, 201, 'error', '无效的请求')
  }
  if (!name || !price || !create_user || !type) {
    responseClient(res, 201, 'error', '参数错误')
  }

  const info = await GoodsModel.findByIdAndUpdate(id, req.body).catch(err => responseClient(res, 201, '服务器内部错误', err))
  if (info) {
    // const updateInfo = await GoodsModel.findById(info._id).catch()
    responseClient(res, 200, 'success', '商品更新成功')
  } else {
    responseClient(res, 201, 'error', '商品更新失败')
  }
}
/**
 * @description: 商品上架、下架
 * @param {type} 
 * @return: 
 */
exports.upperAndlowerGoods = async (req, res, next) => {
  let {id, status} = req.params
  if (!id) {
    responseClient(res, 201, 'error', '无效的请求')
  }
  const info = await GoodsModel.findByIdAndUpdate(id, { status: Number(status)}).catch( err => responseClient(res, 201, '服务器内部错误', err))
  if (info) {
    responseClient(res, 200, 'success', '操作成功')
  } else {
    responseClient(res, 201, 'error', '操作失败')
  }
}

/**
 * @description: 商品列表
 * @param {type} price 1 正序 -1 倒序
 * @return: 
 */
exports.getGoods = async (req, res, next) => {
  let {
    page_num = 1,
    type,
    page_size = 10,
    status,
    price
  } = req.query
  let query = {}
  let options = {
    sort: {
      create_time: 1
    },
    page: Number(page_num),
    limit: Number(page_size)
  }
  if (type) query.type = type
  if (status) query.status = status
  if (price) options.sort.price = price
  const list = await GoodsModel.paginate(query, options).catch( err => responseClient(res, 201, '服务器内部错误', err))

  responseClient(res, 200, 'success', list)
  next();
}

