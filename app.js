const csvFilePath = 'json.csv';
const csv = require('csvtojson');
const fs = require('fs'); 
const finalProducts = [];

csv().fromFile(csvFilePath).then((products) => {
    // console.log(products);
    products.forEach(product => {
        prodIndex = finalProducts.findIndex(prod => prod['sku'] === product['Code for Pictures']);
        if (prodIndex < 0) {
            var productObj = {
                'sku': product['Code for Pictures'],
                'Description': product.Description,
                'Category': product.Category,
                'Product': product.Product,
                'E': [product.Width],
                'F': [product['Height & Depth']],
                'G': [product.Drawers],
                'H': [product.Style],
                'I': [product.Species],
                'color': [product.Colors],
                'dimension': [{
                    'finish': product.Finish,
                    'E': product.Width,
                    'F': product['Height & Depth'],
                    'G': product.Drawers,
                    'H': product.Style,
                    'I': product.Species,
                    'color': product.Colors,
                    'price': product.Price
                }],
            };
            finalProducts.push(productObj);
        } else {
        	pushCheckDuplicate(finalProducts[prodIndex].E, product.Width);
        	pushCheckDuplicate(finalProducts[prodIndex].F, product['Height & Depth']);
        	pushCheckDuplicate(finalProducts[prodIndex].G, product.Drawers);
        	pushCheckDuplicate(finalProducts[prodIndex].H, product.Style);
        	pushCheckDuplicate(finalProducts[prodIndex].I, product.Species);
        	pushCheckDuplicate(finalProducts[prodIndex].color, product.Colors);
        	finalProducts[prodIndex].dimension.push({
                    'finish': product.Finish,
                    'E': product.Width,
                    'F': product['Height & Depth'],
                    'G': product.Drawers,
                    'H': product.Style,
                    'I': product.Species,
                    'color': product.Colors,
                    'price': product.Price
                });
        }
    });
    console.log(finalProducts);
    fs.writeFile("out.json", JSON.stringify(finalProducts), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
}); 
});

function isDuplicate(arr, value) {
    return arr.findIndex(val => val === value) < 0 ? false : true;
}

function pushCheckDuplicate(arr, value) {
    if (!isDuplicate(arr, value)) {
        arr.push(value);
    }
}