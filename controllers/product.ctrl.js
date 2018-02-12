class ProductCtrl {
    get(req, res) {
        res.render("pages/products");
    }
}

module.exports = new ProductCtrl();