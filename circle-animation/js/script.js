const paths = document.getElementsByTagName('path');

const x = () => {
    for (let index = 0; index < paths.length; index++) {
        paths[index].classList.add('animate')
    }
}

document.getElementById('x').addEventListener('click', _ => {
    x();
})