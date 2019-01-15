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
exports.goods = async(req, res, next) => {
  let goods = new GoodsModel(req.body);
  const goodsInfo = await goods.save().catch(e => responseClient(res, 201, 'error', e));
  if (goodsInfo) {
    responseClient(res, 200, 'success', goodsInfo)
  } else {
    responseClient(res, 201, 'error')
  }
}
