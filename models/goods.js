const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Goods = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    trim: true,
    required: true
  },
  discount: {
    type: Number,
    trim: true,
    defult: 100
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    trim: true,
    default: Date.now,
    required: true
  },
  update_time: {
    type: Date,
    trim: true,
    default: Date.now,
    required: false
  },
  create_user: {
    type: String,
    required: true
  },
  images: {
    type: Array
  },
  status: {
    // 0 商品待发布 1 上架 2 下架
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

Goods.plugin(mongoosePaginate);
const GoodsModel = mongoose.model("Goods", Goods);
module.exports = GoodsModel;
