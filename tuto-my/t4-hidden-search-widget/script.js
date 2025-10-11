const btn = document.querySelector('.btn')
const search = document.querySelector('.search')

btn.addEventListener('click', () => {
    if (search.classList.contains('active'))
        search.classList.remove('active');
    else
        search.classList.add('active');
})