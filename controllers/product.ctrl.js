const Product = require("../models/product.model");
const Review = require("../models/review.model");

class ProductCtrl {
    get(req, res) {
        Product.find()
            .sort("-lastUpdated")
            .limit(20)
            .exec()
            .then(function (products) {
                res.render("pages/products", { products: products });
            })
            .catch(function (err) {
                res.render("pages/error");
            });
    }

    getById(req, res) {
        var id = req.params.id;
        Product.findById(id)
            .exec()
            .then(function (product) {
                Review.find({ productId: id }, { '__v': 0 })
                    .exec()
                    .then(function (reviews) {
                        var jsonProduct = product.toJSON();
                        jsonProduct.reviews = reviews;
                        res.render("pages/product", { product: jsonProduct });
                    });
            })
            .catch(function (err) {
                console.log(err);
                res.render("pages/error");
            });
    }

    save(req, res) {
        let product = new Product(req.body);
        product.save()
            .then(function (product) {
                res.redirect("/products");
            })
            .catch(function (err) {
                res.render("pages/error");
            });
    }

    new(req, res) {
        res.render("pages/new-product");
    }

    remove(req, res) {
        var id = req.params.id;
        Product.findByIdAndRemove(id)
            .then(function () {
                res.redirect("/products");
            })
            .catch(function (err) {
                res.render("pages/error");
            });
    }
}

module.exports = new ProductCtrl();