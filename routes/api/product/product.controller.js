const Product = require("./product.model");
const _ = require("lodash");

function handleError(res, err) {
  return res.send(500, err);
}

// Get list of products
exports.index = function(req, res) {
  Product.find(function(err, products) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, products);
  });
};

// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      return handleError(res, err);
    }
    if (!product) {
      return res.send(404);
    }
    return res.json(product);
  });
};

exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      return handleError(res, err);
    }
    if (!product) {
      return res.send(404);
    }
    const updated = _.merge(product, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }

      return res.json(200, product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      return handleError(res, err);
    }
    if (!product) {
      return res.send(404);
    }
    product.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};
