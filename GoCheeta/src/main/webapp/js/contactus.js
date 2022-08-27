const branchListContainer = document.querySelector("#branchList");
var branchesDetails = document.querySelectorAll("#branch-details div");
var defaultScroll ;

// test1();

function switchBranchDetails(branch){

    setSelectedBranch(branch);
    branchesDetails.forEach(branchDetails=> {
        if(branchDetails.getAttribute('data-branch') == branch){
          
            branchDetails.classList.add("branch-detail-active");
           
            
        }else{
           
            branchDetails.classList.remove("branch-detail-active");
            
        }
    })


}

function setSelectedBranch(branchId){
    var branchesList = document.querySelectorAll("#branchList h2");
    branchesList.forEach(branch => {
        if(branch.id == branchId){
            branch.classList.add("branch-selected");
        }else{
            branch.classList.remove("branch-selected");
        }
    })

}

function prevBranch(){
    var branchesList = document.querySelectorAll("#branchList h2");
    var selectedBranch = document.getElementsByClassName("branch-selected");
    var selectedIndex = Array.from(branchesList).indexOf(selectedBranch[0]);
    var lastBranch = branchesList[branchesList.length-1];

    branchListContainer.insertBefore(lastBranch,branchesList[0]);
    switchBranchDetails(branchesList[selectedIndex-1].id)

}

function nextBranch(){
    var branchesList = document.querySelectorAll("#branchList h2");
    var selectedBranch = document.getElementsByClassName("branch-selected");
    var selectedIndex = Array.from(branchesList).indexOf(selectedBranch[0]);
 
    
    var first = branchesList[0];
    branchListContainer.append(first);
    switchBranchDetails(branchesList[selectedIndex+1].id);


}


function onScroll(e){
    //console.log(e.oldScroll );
    if(e.deltaY<0){
        prevBranch()
    }else if(e.deltaY>0){
        nextBranch();
    }
}

// function test1(){
//    var first = branchesList[0];
//    var last = branchesList[branchesList.length-1];
//    first.id = first.id+"Cloen";
//    last.id = last.id+"Cloen";

//    first.before(last.cloneNode(true));
//    last.after(first.cloneNode(true));

// }