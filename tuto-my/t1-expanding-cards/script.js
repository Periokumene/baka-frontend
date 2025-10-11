const panels = document.querySelectorAll('.panel');
for (const panel of panels) {
    panel.addEventListener('click', ()=>{
        clearActivePanels();
        panel.classList.add('active');

    })
}

function clearActivePanels(){
    for (let panel of panels) {
        panel.classList.remove('active');
    }
}