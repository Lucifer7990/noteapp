
// ------ preparation -------

if(localStorage.getItem("titles") === null && localStorage.getItem("contents") === null){
    let arr = ["Note App","Limitation"];
    let arr2 = ["Made By Dhruv","you can't write topics, only paragraphs. . ."];
    localStorage.setItem("titles",JSON.stringify(arr));
    localStorage.setItem("contents",JSON.stringify(arr2));
}
shownotes();

// --------Add note -------

document.getElementById("addNote").addEventListener('click', function () {

    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    if (title == '') {
        alert('You Should Enter Title. . .');
    }
    if (content == '') {
        alert('You Should Enter Note Content. . .');
    }
    if(title != '' && content!=''){
        let titles = JSON.parse(localStorage.getItem("titles"));
        titles.push(title);
        localStorage.setItem("titles",JSON.stringify(titles));
        let contents = JSON.parse(localStorage.getItem("contents"));
        contents.push(content);
        localStorage.setItem("contents",JSON.stringify(contents));
        shownotes();
        document.getElementById("title").value = '';
        document.getElementById("content").value = '';
    }
});



// --------- show notes function ----------



function shownotes(){
    let notesArea = document.getElementById("notesArea");
    notesArea.innerHTML = '';
    let titles = JSON.parse(localStorage.getItem("titles"));
    let contents = JSON.parse(localStorage.getItem("contents"));
    titles.forEach(function(element,index){
        notesArea.innerHTML += `<div class="note">
                                    <h2>${titles[index]}</h2>
                                    <p>${contents[index]}</p>
                                    <div class="btn" id="${index}" onclick="delnote(this.id)">Delete Note</div>
                                </div>`;
    });
}


// --------- for deleting notes ----------


function delnote(id){

    let titles = JSON.parse(localStorage.getItem("titles"));
    let contents = JSON.parse(localStorage.getItem("contents"));
    let title = titles[Number(id)];
    let content = contents[Number(id)];
    
    for(let i=Number(id);i<titles.length;i++){
        titles[i]=titles[i+1];
        contents[i]=contents[i+1];
    }
    if(titles.length == 1){
        contents = [];
        titles = [];
        titles = JSON.stringify(titles);
        contents = JSON.stringify(contents);
    }
    else{
        titles = JSON.stringify(titles);
        titles = titles.substring(0,titles.indexOf(`,null`));
        titles = titles +']';
        contents = JSON.stringify(contents);
        contents = contents.substring(0,contents.indexOf(`,null`));
        contents = contents +']';
    }
    
    localStorage.setItem("contents",contents);
    localStorage.setItem("titles",titles);
    shownotes();
}
