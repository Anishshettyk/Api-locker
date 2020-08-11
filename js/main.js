let input = document.querySelector('.categories');
let count = document.querySelector('.count');
let apiList = document.querySelector('.free-apis');
let loaderHTML = document.querySelector('.loader');
let scrollToTopBtn = document.querySelector('#top');
document.querySelector('.showBtn').addEventListener('click', getApis);

const renderLoader = () => {
    let loader = `
      <div class="spinner-border spinner" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      `;
    loaderHTML.insertAdjacentHTML('beforeend', loader);
}

const clearLoader = () => {
    let spinner = document.querySelector('.spinner');
    if (spinner) {
        spinner.parentElement.removeChild(spinner);
    }

}
async function getApis() {
    apiList.innerHTML = "";
    count.textContent = "";
    let category = input.value;

    renderLoader();
    fetch(`https://api.publicapis.org/entries?category=${category}&https=true`)

        .then(apis => {
            data = apis.json();
            return data;
        })
        .then(data => {

            // console.log(data);
            count.innerHTML = `<span>${data.count} </span>Free api's found`;

            let entries = data.entries;
            // console.log(entries);
            clearLoader();
            entries.forEach(el => {
                if (el.Auth == "")
                    el.Auth = ' 🔐 no authorization required';
                if (el.HTTPS === true) {
                    el.HTTPS = "Supported 📡";
                }
                if (el.Auth === "apiKey") {
                    el.Auth = "🗝 api key is required.";
                }
                if (el.Auth === "OAuth") {
                    el.Auth = "⚙ OAuth is required.";
                }


                displayApi(el);
            });

        })

        .catch(error => {
            if (error) {
                alert("Sorry, Something went wrong !");
            }
        })
}


const displayApi = (el) => {

    let markup = ` 
        <div class="apibox card " data-aos="fade-up">
            <h4 class="mt-4 title">${el.API}</h4>
            <p class="blue">${el.Description}</p>
            <p class="black">Category: ${el.Category}</p>
            <p class="float-left">${el.Auth}</p>
            <p class="float-left">HTTPS ${el.HTTPS}</p>
            <a href=${el.Link} class="btn link float-right" target="_blanck" >View</a>
        </div>
        `;

    apiList.insertAdjacentHTML('beforeend', markup)
}

//Scroll to top button

let displayScrollBtn = () => {
    let y = window.scrollY;
    if (y > 200) {
        scrollToTopBtn.classList.replace("hide", "show")
    } else {
        scrollToTopBtn.classList.replace("show", "hide");
    }
}
window.addEventListener('scroll', displayScrollBtn);

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
});

//todo
// update portfolio with this project