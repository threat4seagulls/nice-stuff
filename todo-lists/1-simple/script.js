var changeBlockDown = function() {
    totalCount = $('.items').children().length;
    selectedCount = $('.checker:checked').length;
    if (totalCount == 0) {
        $('.block-down').hide();
        $('#select-all').hide();
        $('#select-all-label').hide();
    }
    else {
        $('.block-down').show();
        $('#select-all').show();
        $('#select-all-label').show();
        if (totalCount > selectedCount) 
            $("#select-all").prop("checked", false);
        $('#counter > b').text(String(totalCount-selectedCount));
        if (selectedCount == 0) {
            $('#clear-complited').hide();
        }
        else {
            $('#clear-complited').text("Clear " + String(selectedCount) + " complited item" + (selectedCount == 1 ? "" : "s"));
            $('#clear-complited').show();                
        }
    }
}

var updateStorage = function() {
      var elems = $('.item > span').toArray();
      for (i in elems)
        elems[i] = $(elems[i]).text();
      localStorage.setItem("ThingsToDo", JSON.stringify(elems));
}
var addNewItem  = function(name) {
    $('.items').prepend($('<div class="item">')
        .append($('<input type="checkbox" class="checker">'))
        .append($('<span>').text(name)) 
        .append($('<a class="destroy">'))
        );
    changeBlockDown();
    updateStorage();
    return true;
}

var deleteItem = function (object) {
    $("#select-all").prop("checked", false);
    object.parent().remove();
    changeBlockDown();
    updateStorage();
}

var loadElements = function() {
    changeBlockDown();
    var elems = JSON.parse(localStorage.getItem("ThingsToDo"));
    console.log(elems);
    for (i in elems)
        addNewItem(elems[elems.length-i-1]);
}


$(document).ready(function () {
    loadElements();

    $('#new-item').keypress(function(e) {
        if (e.keyCode == 13) {
            if ($(this).val()!="") {
                    addNewItem($(this).val());
                    $(this).val('').change();
            }
            return true;
       }
    });

});

$(document).on('change', '.checker', function() {
   $(this).siblings('span').toggleClass('selected'); 
    changeBlockDown();        
});

$(document).on("click", "#select-all", function(){
    if ($(this).is(":checked")) {
        $('.checker').prop('checked', true);
        $('.checker').siblings('span').addClass('selected'); 
    } else {
        $('.checker').prop('checked', false);
        $('.checker').siblings('span').removeClass('selected');             
    }
    changeBlockDown();
});

$(document).on("click",'.destroy', function() {
    deleteItem($(this));
    return true;
});
$(document).on("click",'#clear-complited', function() {
    $('.checker:checked').each(function() {deleteItem($(this));});
        return false;
});

$(document).on('dblclick', '.item > span', function() {
  $(this).replaceWith($('<input type="text" id="input">').val($(this).text()));
  $('#input').focus();
  $('#input').on('blur', function() {
    if($(this).val().length == 0)
      $(this).parent().remove();
    $(this).replaceWith($('<span>').html($(this).val()));
    updateStorage();
  });
  $('#input').on('keypress', function(e) {
    if (e.keyCode == 13) {
        if($(this).val().length == 0)
          $(this).parent().remove();
        $(this).replaceWith($('<span>').html($(this).val()));
        updateStorage();
    }
  });

});
