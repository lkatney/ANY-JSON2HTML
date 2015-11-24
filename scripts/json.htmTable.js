// This function creates a standard table with column/rows
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show

var firstTableFound = false;
function CreateTableView(objArray, theme, enableHeader) {
    // set optional theme parameter
    if (theme === undefined) {
        theme = 'mediumTable'; //default theme
    }

    if (enableHeader === undefined) {
        enableHeader = true; //default enable headers
    }
    
    var array = objArray;
    var found = false;
    var str = '';

    if(array.length == 0){
        str += 'EMPTY';
    }else{

        if(firstTableFound){
            str += '<div class="scrollable-table"><table class="' + theme + '">';
        }else{
            str += '<table class="' + theme + '">';
            found = true;
            firstTableFound = true;
        }

        // table head
        if (enableHeader && whichObject(array[0]) == 'Object') {
            str += '<thead><tr>';
            for (var index in array[0]) {
                str += '<th scope="col">' + index + '</th>';
            }
            str += '</tr></thead>';
        }

        // table body
        str += '<tbody>';
        for (var i = 0; i < array.length; i++) {
            str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';

            if(whichObject(array[i]) == 'Object'){
                for (var index in array[i]) {
                    if(whichObject(array[i][index]) == 'Object'){
                        str += '<td>'+ CreateDetailView(array[i][index]) + '</td>';
                    }else if(whichObject(array[i][index]) == 'Array'){
                         str += '<td>'+ CreateTableView(array[i][index]) + '</td>';
                    }else{
                        str += '<td>' + array[i][index] + '</td>';
                    }
                }
            }else  if(whichObject(array[i]) == 'Array'){
                str += '<td>' + CreateTableView(array[i]) + '</td>';
            }else{
                str += '<td>' + array[i] + '</td>';
            }
            str += '</tr>';
        }
        str += '</tbody>'
        str += '</table>';
        if(!found){
            str += '</div>';
        }

    }
    return str;
}

// This function creates a details view table with column 1 as the header and column 2 as the details
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateDetailView(objArray, theme, enableHeader) {
    // set optional theme parameter
    if (theme === undefined) {
        theme = 'mediumTable';  //default theme
    }

    if (enableHeader === undefined) {
        enableHeader = true; //default enable headers
    }

    var found = false;
    var str = '';

    if(firstTableFound){
        str += '<div class="scrollable-table"><table class="' + theme + '">';
    }else{
        str += '<table class="' + theme + '">';
        found = true;
        firstTableFound = true;
    }
    str += '<tbody>';

    var row = 0;
    for (var index in objArray) {
        row++;
        str += (row % 2 == 0) ? '<tr class="alt">' : '<tr>';

        if (enableHeader) {
            str += '<th scope="row">' + index + '</th>';
        }

        if(whichObject(objArray[index]) == 'Object'){
            str += '<td>' + CreateDetailView(objArray[index]) + '</td>';
        }else if(whichObject(objArray[index]) == 'Array'){
            str += '<td>' + CreateTableView(objArray[index]) + '</td>';
        }else{
            str += '<td>' + objArray[index] + '</td>';
        }
        str += '</tr>';
    }
    str += '</tbody>';
    str += '</table>';
    if(!found){
        str += '</div>';
    }

    return str;
}


function CreateView(objArray, theme, enableHeader){
    var html = '';
    if(whichObject(objArray) == 'Object'){
        html += CreateDetailView(objArray, theme, enableHeader);
    }else if(whichObject(objArray) == 'Array'){
        html += CreateTableView(objArray, theme, enableHeader);
    } 
    return html;
}


function whichObject(object) {
    var arrayConstructor = [].constructor;
    var objectConstructor = {}.constructor;

    if (object === null) {
        return "null";
    }
    else if (object === undefined) {
        return "undefined";
    }
    else if (object.constructor === arrayConstructor) {
        return "Array";
    }
    else if (object.constructor === objectConstructor) {
        return "Object";
    }
}

