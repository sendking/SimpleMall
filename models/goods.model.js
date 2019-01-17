/*
 * @Author: jhd
 * @Date: 2018-12-24 15:54:23
 * @Description: Goods
 */

const mongoose = require('mongoose');
// 分页
const mongoosePaginate = require('mongoose-paginate');
/**
 * @msg: 商品表结构
 * @param {name} 商品名
 * @param {type} 商品类型
 * @param {price} 商品价格
 * @param {discount} 商品折扣 百分比
 * @param {create_time} 商品创建时间
 * @param {update_time} 商品修改时间
 * @param {create_user} 创建人
 * @param {description} 商品介绍
 * @param {images} 商品图片
 * @param { status } 商品状态
 */
const Goods = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true
  },
  discount: {
    type: Number,
    trim: true,
    default: 100 
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    trim: false,
    default: Date.now
  },
  update_time: {
    type: Date,
    trim: true,
    default: Date.now
  },
  create_user: {
    type: String,
    required: true
  },
  images: {
    type: Array,
  },
  status: {
    // 0 商品待发布 1 上架商品 2 下架商品
    type: Number,
    default: 1
  }
});
/**
 * 数据结构
 *
  "discount": 10,
  "images": [
    "{path:'https://baike.baidu.com/pic/Javascript%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/6923938/0/3c6d55fbb2fb4316b05a1f902aa4462308f7d397?fr=lemma&ct=single'}"
  ],
  "status": 1,
  "_id": "5c3d7102d8187841f8369445",
  "name": "testll",
  "type": "test",
  "price": 3999,
  "create_time": "2019-01-15T05:30:27.000Z",
  "update_time": "2019-01-15T05:30:27.000Z",
  "create_user": "tset",
  "description": "这是一个测试商品",
  "__v": 0
 *  */

// 添加分页插件
Goods.plugin(mongoosePaginate);
const GoodsModel = mongoose.model('Goods', Goods);
module.exports = GoodsModel;