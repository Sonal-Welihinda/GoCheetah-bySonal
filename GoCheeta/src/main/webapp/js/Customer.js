

function HorizontalScroll(event, div){
    div.scrollLeft += event.deltaY;
}


function openModal(ModalID){
    var modal = document.getElementById(ModalID);
    modal.classList.add("Active");

    modal.addEventListener('click' , (event) => {
        if(modal.isSameNode(event.target) || event.target.isSameNode(document.querySelector("#"+ModalID+" .close")) || event.target.isSameNode(document.querySelector("#"+ModalID+" input[type='reset']")))
        {
            modal.classList.remove("Active");
            modal.removeEventListener('click', this);
           
        }
    });

}