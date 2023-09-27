function configureListeners() {
    let images = document.querySelectorAll('img'); // select img elements  

    images.forEach((i) => {
            document.getElementById(i.id).addEventListener('mouseover', addOpacity, false)
            document.getElementById(i.id).addEventListener('mouseout', removeOpacity, false)
        })
}

function addOpacity(event) {
    // add appropriate CSS class
    if (!this.classList.contains('dim')) {
        this.classList.add('dim');
    }
    getProductInfo(event.target.id);
}

function removeOpacity(event) {
     //remove appropriate CSS class
     if (this.classList.contains('dim')) {
        this.classList.remove('dim');
    }

    let element = document.getElementById('color-price');
        element.textContent = '';
        
    let color = document.getElementById('color-name');
        color.textContent = ''; 

    event.preventDefault();
}

function getProductInfo(paintColor) {
    let price = 0;
    let colorName;
    
    switch (paintColor) {
        case 'pn1':
            price = '$14.99';
            colorName = 'Lime Green';
            break;
        case 'pn2':
            price = '$11.14';
            colorName = 'Medium Brown';
            break;
        case 'pn3':
            price = '$22.99';
            colorName = 'Royal Blue';
            break;
        case 'pn4':
            price = '$13.42';
            colorName = 'Solid Red';
            break;
        case 'pn5':
            price = '$21.98';
            colorName = 'Solid White';
            break;
        case 'pn6':
            price = '$4.99';
            colorName = 'Solid Black';
            break;
        case 'pn7':
            price = '$8.22';
            colorName = 'Solid Cyan';
            break;
        case 'pn8':
            price = '$11.99';
            colorName = 'Solid Purple';
            break;   
        case 'pn9':
            price = '$14.99';
            colorName = 'Solid Yellow';
            break;
          default:
            break;
    }
    if (price !== 0) {
        updatePrice(colorName, price);
    }

    function updatePrice(colorName, price)
    {       
        // display price
        let colorPrice = document.getElementById('color-price'); // select element with corresponding id
        colorPrice.textContent = price;
        //display color name
        let color = document.getElementById('color-name');// select element with corresponding id
        color.textContent = colorName;
    } 
}
