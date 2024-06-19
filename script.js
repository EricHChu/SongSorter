let songs = new Array;
let textOne;
let textTwo;
let returned = false;
let choice = false;
//var savedResolve;

function sendSongs(csvSongs){
    document.getElementsByClassName("songEntry")[0].style.display="none";
    document.getElementsByClassName("first")[0].style.height="100vh";
    document.getElementsByClassName("second")[0].style.height="100vh";
    console.log(csvSongs);
    songs = csvSongs.split("|");
    for(let i = 0;i < songs.length;i++){
        songs[i].trim();
    }
    alert(csvSongs);
    sortSongs();
}

function returnChoice(selected){
    returned = true;
    choice = selected;
    console.log(songs);
    //savedResolve.resolve("Yes");
}

function sortSongs(){
    textOne = document.getElementById("textOne");
    textTwo = document.getElementById("textTwo");
    mergeSort(songs,0,songs.length - 1);
    console.log("E");
}

function displaySorted(){
    document.getElementsByClassName("first")[0].style.display="none";
    document.getElementsByClassName("second")[0].style.display="none";
    document.getElementsByClassName("display")[0].style.display="flex";
    document.getElementsByTagName('body')[0].style.overflow="visible";
    document.getElementsByTagName('body')[0].style.scroll="yes";
    var htmlList = document.getElementsByTagName("p")[0];
    var text = "";
    for(var i = 0; i < songs.length; i++){
        if(i != 0){
            text = text + " | "
        }
        text = text + (i+1) + ": " + songs[songs.length - i - 1];
        if((i+1) %  5 == 0){
            text = text + "</br>";
        }
    }
    htmlList.innerHTML = text;
}

async function compare(song1,song2){
    textOne.innerHTML = song1;
    textTwo.innerHTML = song2;
    returned = false;
    while(!returned) await timeout(50);
    returned = false;
    return choice;
}

async function timeout(ms){
    return new Promise(res => setTimeout(res, ms));
}

async function merge(arr, l, m, r){
    var n1 = m - l + 1;
    var n2 = r - m;

    // Create temp arrays
    var L = new Array(n1); 
    var R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    var i = 0;

    // Initial index of second subarray
    var j = 0;

    // Initial index of merged subarray
    var k = l;

    while (i < n1 && j < n2) {
        await compare(L[i],R[j]);
        returned = false;
        if(choice){
            arr[k] = L[i];
            i++;
        }else{
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted
async function mergeSort(arr,l, r){
    if(l>=r){
        return;
    }
    var m =l+ parseInt((r-l)/2);
    await mergeSort(arr,l,m);
    await mergeSort(arr,m+1,r);
    await merge(arr,l,m,r);
    if(l == 0 && r == songs.length - 1){
        displaySorted();
    }
}