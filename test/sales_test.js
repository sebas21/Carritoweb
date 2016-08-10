var chai = require('chai'); 
var expect = chai.expect;
var salesController = require('../controllers/sales'); // controller


describe('#sales controller',function(){
    
    describe("save sales",function(){
        it('Should save a sale on database',function(done){
            var salesModel = require('../model/Sale');
            var newSale = new salesModel({
                "Total": 2500000
            });
            salesController.saveSale(newSale,function(err){
                expect(newSale).to.have.property('Total');
                expect(newSale.Total).to.be.a('Number').and.to.not.be.below(1);//less than 
                expect(newSale).to.be.an.instanceof(salesModel);
                expect(err).to.not.exist;
                done();
            });
        });

        it("Shouldn't save a sale when the product total is less than 0",function(done){
            var salesModel = require('../model/Sale');
            var newSale = new salesModel({
                "Total": -1
            });
            salesController.saveSale(newSale,function(err){
                expect(newSale).to.have.property('Total');
                expect(newSale.Total).to.be.a('Number').to.be.below(0);//less than 
                expect(newSale).to.be.an.instanceof(salesModel);
                expect(err).to.exist;
                done();
            });
        });

        it("Shouldn't save a sale when the product total isn't instance of salesModel",function(done){
            var salesModel = require('../model/Sale');
            var newSale = {
                "Total": 512300
            };
            salesController.saveSale(newSale,function(){
                expect(newSale).to.have.property('Total');
                expect(newSale.Total).to.be.a('Number').to.not.be.below(1);//less than 
                expect(newSale).to.not.be.an.instanceof(salesModel);
                done();
            });
        });

    });
    
    it('Should get an array with the sales on database',function(done){
        salesController.findAllSales(function(err,sales){
            expect(sales).to.be.an('array');
            expect(sales).to.have.length.above(1);//greater than
            expect(sales[0]).to.have.property('Total');
            expect(err).to.not.exist;
            done();
        });
    });

    it("Should get products' total sum on database",function(done){
        salesController.calculateTotal(function(err,sales){
            var total = 0;
            for(var i=0;i<sales.length;i++){
                total += sales[i].Total; 
            }
            expect(total).to.be.a("Number").and.to.be.least(1);//greater than or equal
            expect(total).not.to.be.NaN;
            expect(err).to.not.exist;
            done();
        });
    });
});