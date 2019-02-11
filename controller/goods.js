const GoodsModel = require("../models/goods");
const { responseClient } = require("../util");

exports.goods = async (req, res, next) => {
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
