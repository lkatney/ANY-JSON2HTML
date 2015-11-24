var lastPos = 0;
var lastPosVertical = 0;

function startProcessing(){
    var jsonString = $('textarea#input').val();
    var json = JSON.parse(jsonString);

    $('#DynamicGrid').append(CreateView(json, "lightPro", true)).fadeIn();

    $( ".scrollable" ).mouseenter(function() {
        lastPos = 0;
        lastPosVertical = 0;
        enableScroll($(this).find("table"), true);
    }).mouseleave(function() {
        lastPos = 0;
        lastPosVertical = 0;
        enableScroll($("#DynamicGrid"), false);
    });
}

function enableScroll(elem, freezeHeader){
    elem.scroll(function() {
        var currPos = elem.scrollLeft();
        var currPosVert = elem.scrollTop();
        var elems = elem.find('thead');
        //console.log(elems);
        if (lastPos < currPos) {
            freezeHeader ? freeze(elems) : deFreeze(elems);
            lastPos = currPos;
        }else if (lastPos > currPos) {
            freezeHeader ? freeze(elems) : deFreeze(elems);
            lastPos = currPos;
        }

        if (lastPosVertical < currPosVert) {
            freezeHeader ? freeze(elems) : deFreeze(elems);
            lastPosVertical = currPosVert;
        }else if (lastPosVertical > currPosVert) {
            freezeHeader ? freeze(elems) : deFreeze(elems);
            lastPosVertical = currPosVert;
        }
    });
}

function freeze(elems){
    elems.each(function( index ) {
        $(elems[index]).addClass('fixed-header');
    });
}

function deFreeze(elems){
    elems.each(function( index ) {
        $(elems[index]).removeClass('fixed-header');
    });
}