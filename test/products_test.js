
var chai = require('chai'); 
var expect = chai.expect;
var productsController = require('../controllers/products'); // controller



describe('#products controller',function(){

	describe("update product's Like",function(){
		it("Should update product's Like on database",function(done){
			var name = "Nike shoe";
			var value = 500;
			var rule = "like";
			productsController.perceptionProductUpdate(name,rule,value,function(err,product){
				expect(name).to.be.a('String').and.not.to.equal("");
				expect(rule).to.be.a("String").and.to.equal("like");
				expect(value).to.be.a("Number").not.to.be.below(0);//less than
				expect(product).to.exist;
				expect(err).to.not.exist;
				done();
			});
		});
		it("Shouldn't update product's Like on database when the product value update is less than 0",function(done){
			var name = "Nike shoe";
			var value = -1;
			var rule = "like";
			productsController.perceptionProductUpdate(name,rule,value,function(err){
				expect(name).to.be.a('String').and.not.to.equal("");
				expect(rule).to.be.a("String").and.to.equal("like");
				expect(value).to.be.a("Number").to.be.below(0);//less than 
				expect(err).to.exist;
				done();
			});
		});
		it("Should get null when the product update not exist",function(done){
			var name = "this product not exist";
			var value = 1000;
			var rule = "like";
			productsController.perceptionProductUpdate(name,rule,value,function(err,product){
				expect(name).to.be.a('String').and.not.to.equal("");
				expect(rule).to.be.a("String").and.to.equal("like");
				expect(value).to.be.a("Number").not.to.be.below(0);//less than 
				expect(product).to.equal(null);
				done();
			});
		});
	});

	describe("update product's Dislike",function(){
		it("Should update product's Dislike on database",function(done){
			var name = "Nike shoe";
			var value = 150;
			var rule = "dislike";
			productsController.perceptionProductUpdate(name,rule,value,function(err,product){
				expect(name).to.be.a('String').and.not.to.equal("");
				expect(rule).to.be.a("String").and.to.equal("dislike");
				expect(value).to.be.a("Number").not.to.be.below(0);//less than
				expect(product).to.exist;
				expect(err).to.not.exist;
				done();
			});
		});
		it("Should update product's Dislike on database when the product value update is less than 0",function(done){
			var name = "Nike shoe";
			var value = -1;
			var rule = "dislike";
			productsController.perceptionProductUpdate(name,rule,value,function(err,product){
				expect(name).to.be.a('String').and.not.to.equal("");
				expect(rule).to.be.a("String").and.to.equal("dislike");
				expect(value).to.be.a("Number").to.be.below(0);//less than 
				expect(err).to.exist;
				done();
			});
		});
		it("Should get null when product update not exist",function(done){
			var name = "this product not exist";
			var value = 1000;
			var rule = "dislike";
			productsController.perceptionProductUpdate(name,rule,value,function(err,product){
				expect(name).to.be.a('String').and.not.to.equal("");
				expect(rule).to.be.a("String").and.to.equal("dislike");
				expect(value).to.be.a("Number").not.to.be.below(0);//less than 
				expect(product).to.equal(null);
				done();
			});
		});
	});

	describe("update product's Quantity",function(){
		it("Should update product's Quantity on database",function(done){
			var name = "Nike shoe";
			var value = 23;
			productsController.quantityProductUpdate(name,value,function(err,product){
				expect(name).to.be.a('String').and.not.to.equal("");
				expect(value).to.be.a("Number").not.to.be.below(0);//less than 
				expect(product).to.exist;
				expect(err).to.not.exist;
				done();
			});
		});

		it("Shouldn't update product's Quantity when the product value update is less than 0",function(done){
			var name = "Nike shoe";
			var value = -1;
			productsController.quantityProductUpdate(name,value,function(err){
				expect(name).to.be.a('String').and.not.to.equal("");
				expect(value).to.be.a("Number").to.be.below(0);//less than 
				expect(err).to.exist;
				done();
			});
		});
		it("Should get null when the product update not exist",function(done){
			var name = "this product not exist";
			var value = 23;
			productsController.quantityProductUpdate(name,value,function(err,product){
				expect(name).to.be.a('String').and.not.to.equal("");
				expect(value).to.be.a("Number").not.to.be.below(0);//less than
				expect(product).to.equal(null);
				done();
			});
		});
	});

	it('Should get the products on database',function (done){
		productsController.findAllProducts(function(err,products){
			expect(err).not.exist;
			expect(products).to.be.an('array');
			expect(products).to.have.length.above(1);//greater than
			expect(products[0]).to.have.property('Nombre');
			expect(products[0]).to.have.property('Precio');
			expect(products[0]).to.have.property('Cantidad');
			expect(products[0]).to.have.property('Like');
			expect(products[0]).to.have.property('Dislike');
			expect(products[0]).to.have.property('Imagen');
			done();
		});
	});
});