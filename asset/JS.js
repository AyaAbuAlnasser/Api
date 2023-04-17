let skip = 0;
let limit = 9;
window.addEventListener('load', function () {
    fetchProducts(limit, skip);

    document.getElementById('next').addEventListener('click', function () {
        skip = skip + limit;
        fetchProducts(limit, skip);
    });

    document.getElementById('prev').addEventListener('click', function () {
        skip = skip - limit;
        fetchProducts(limit, skip);
    });
});

async function fetchProducts(limit, skip)
{
    let products = [];

    document.querySelectorAll('.card').forEach(function (card) {
        card.remove();
    });

    document.getElementById('loading').style.display = 'block';
    
    await fetch("https://dummyjson.com/products?limit=" + limit + '&skip=' + skip)
        .then(function (res) {
            return res.json();
        })
        .then(res => (products = res.products));
    
    
    document.getElementById('loading').style.display = 'none';
    

    products.forEach(product => {
        appendNewProduct(product);
    });
}

function appendNewProduct(product)
{
    let card = document.getElementById('template').cloneNode(true);

    card.setAttribute('id', '');
    card.classList.add('card');
    card.querySelector('#product_image').setAttribute('src', product.thumbnail);
    card.querySelector('.title').setHTML(product.title);
    card.querySelector('.category').setHTML(product.category);
    card.querySelector('.description').setHTML(product.description);
    card.querySelector('.brand').setHTML(product.brand);

    card.querySelector('.discountPercentage').setHTML(product.discountPercentage);
    card.querySelector('.rating').setHTML(product.rating);
    card.querySelector('.stock').setHTML(product.stock);
    card.querySelector('.price').setHTML(product.price);

    card.style.display = 'block';

    document.getElementById('cardSection').appendChild(card);
}