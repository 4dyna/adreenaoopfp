function searchMakeup() {
    const selectedMakeup = document.getElementById("makeupInfo").value;
    const endpoint = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${selectedMakeup}`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                displayMakeupInfo(data[0]);
            } else {
                document.getElementById("info").innerHTML = `No info found for the makeup brand "${selectedMakeup}".`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("info").innerHTML = 'An error occurred while fetching the info.';
        });
}

function displayMakeupInfo(makeupBrand) {
    const brand = makeupBrand.brand;
    const products = makeupBrand.products;

    let definitionOutput = '';

    products.forEach(product => {
        const productType = product.product_type;
        const price = product.price || 'N/A';
        const description = product.description || 'N/A';
        const imageLink = product.image_link || 'N/A';
        const websiteLink = product.website_link || 'N/A';
        const productLink = product.product_link || 'N/A';

        definitionOutput += `
            <h3>${brand} - ${productType}</h3>
            <p>Product Type: ${productType}</p>
            <p>Price: ${price}</p>
            <p>Description: ${description}</p>
            <p>Image: <img src="${imageLink}" alt="Product Image"></p>
            <p>Website: <a href="${websiteLink}" target="_blank">${websiteLink}</a></p>
            <p>Product Link: <a href="${productLink}" target="_blank">${productLink}</a></p>
        `;
    });

    document.getElementById("info").innerHTML = definitionOutput;
}