const Medicine = require("./medicine.model");
const product = require("../product/product.model");
const _ = require("lodash");

function handleError(res, err) {
  return res.status(500).json(err);
}

// Get list of Medicines
exports.index = function(req, res) {
  Medicine.find(function(err, medicines) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(medicines);
  });
};

// Get a single medicine
exports.show = function(req, res) {
  Medicine.findById(req.params.id)
    .populate("_products")
    .exec(function(err, medicine) {
      if (err) {
        return handleError(res, err);
      }

      if (!medicine) {
        return res.sendStatus(404);
      }

      return res.json(medicine);
    });
};

exports.create = function(req, res) {
  product.create(req.body._products, function(err) {
    if (err) {
      return handleError(res, err);
    }
    const _products = [];

    for (let i = 0; i < arguments[1].length; i++) {
      _products.push(arguments[1][i]._id);
    }

    const _medicine = req.body;
    _medicine._products = _products;

    Medicine.create(_medicine, function(err, medicine) {
      if (err) {
        return handleError(res, err);
      }

      medicine.populate();

      return res.status(201).json(medicine);
    });
  });
};

// Updates an existing medicine in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Medicine.findById(req.params.id, function(err, medicine) {
    if (err) {
      return handleError(res, err);
    }
    if (!medicine) {
      return res.send(404);
    }
    const updated = _.merge(medicine, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }

      return res.json(200, medicine);
    });
  });
};

// Deletes a medicine from the DB.
exports.destroy = function(req, res) {
  Medicine.findById(req.params.id, function(err, medicine) {
    if (err) {
      return handleError(res, err);
    }
    if (!medicine) {
      return res.send(404);
    }
    medicine.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};
