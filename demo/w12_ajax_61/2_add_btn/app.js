
const Btn = document.querySelector('.btn');



function getData() {
    const xhr = new XMLHttpRequest();
    console.log('xhr', xhr);
    xhr.open('GET', './api/simple.txt');
    xhr.onreadystatechange = function () {
        console.log('xhr0', xhr);
        if (xhr.readyState === 4 && xhr.status === 200) {
            const text = document.createElement('p');
            text.textContent = xhr.responseText;
            document.body.appendChild(text);
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
    getData();
});