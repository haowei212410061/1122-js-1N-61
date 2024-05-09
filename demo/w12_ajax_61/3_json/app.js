
const Btn = document.querySelector('.btn');
const url = './api/pepole.json';


function getData(apidata) {
    const xhr = new XMLHttpRequest();
    console.log('xhr', xhr);
    xhr.open('GET', `${apidata}`);
    xhr.onreadystatechange = function () {
        console.log('xhr0', xhr);
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const displayData = data.map((item)=>{
                return `
                <p>${item.name}</p>              
                `
            }).join('');
            const element = document.createElement('div');
            element.innerHTML = displayData;
            document.body.appendChild(element);
        } else {
            console.log({
                status: xhr.status,
                text: xhr.statusText
            })
        }
    }

    xhr.send();
    console.log('hello');
}

Btn.addEventListener('click',()=>{
    getData(url);
});