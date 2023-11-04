$(document).ready(function () {

  var form = new bootstrap.Modal($("#modalForm")[0]);
  var listItems = [];

  let searchParams = new URLSearchParams(window.location.search);
  if (!searchParams.has("skipform")) {
    form.show();
  }

  $("a[use='link']").on('click', function() {
    navigator.clipboard.writeText(window.location.href.split('?')[0] + "?skipform=true#" + $(this).parent().parent().attr('id'));
    $("#toast-header").text("LINK COPIED");
    $("#toast-body").text("The selected link was successfully copied to your clipboard!");
    new bootstrap.Toast($("#liveToast")[0]).show();
  })

  $("a[use='copy']").on('click', function () {
    var strOut = $(this).parent().children("[use='note']").text().trim().toUpperCase();
    navigator.clipboard.writeText(strOut);
    $("#toast-header").text("NOTE COPIED");
    $("#toast-body").text("The selected note was successfully copied to your clipboard!");
    new bootstrap.Toast($("#liveToast")[0]).show();
    console.debug(strOut);
  })

  $("a[use='list']").on('click', function () {
    var note = $(this).parent().parent().attr("id");
    console.debug(note);
    if (listItems.includes(note)) {
      listItems.splice(listItems.indexOf(note), 1);
      console.debug(listItems);
      $(this).addClass("btn-secondary").removeClass("btn-success").text("Add to List");
      if (listItems.length < 1) {
        $("#listCreate").attr("disabled", "");
      }
      $("#toast-header").text("LIST UPDATED");
      $("#toast-body").text("Your list now contains " + listItems.length + " notes.");
      new bootstrap.Toast($("#liveToast")[0]).show();
      return;
    }
    listItems.push(note);
    console.debug(listItems);
    $(this).removeClass("btn-secondary").addClass("btn-success").text("Remove to List");
    $("#listCreate").removeAttr("disabled");
    $("#toast-header").text("LIST UPDATED");
    $("#toast-body").text("Your list now contains " + listItems.length + " notes.");
    new bootstrap.Toast($("#liveToast")[0]).show();
    return;
  })

  $("#listCreate").on('click', function () {
    var strOut = "";
    listItems.forEach(name => {
      console.debug(name);
      strOut += $('[id="' + name + '"]').find('[use="note"]').text().trim().toUpperCase() + "\n\n";
    });
    navigator.clipboard.writeText(strOut.slice(0, -2));
    console.info(strOut.slice(0, -2));
    $("#toast-header").text("LIST GENERATED");
    $("#toast-body").text("The list of " + listItems.length + " notes have been generated and copied to your clipboard. A version has also been copied to the browser's console.");
    new bootstrap.Toast($("#liveToast")[0]).show();
  })

  $("#AEvariesCheck").change(function() {
    if (this.checked) {
      $("#femaElevationForm").attr("disabled", "disabled");
    }
    else {
      $("#femaElevationForm").removeAttr("disabled");
    }
  })

  $("#VEvariesCheck").change(function() {
    if (this.checked) {
      $("#femaElevationVEForm").attr("disabled", "disabled");
    }
    else {
      $("#femaElevationVEForm").removeAttr("disabled");
    }
  })

  $("a[filter]").on('click', function () {
    // clear list
    while (listItems.length > 0) {
      $('[id="' + listItems[0] + '"]').find('[use="list"]').trigger('click');
    }
    if ($(this).attr("filter") == "__clear") {
      return;
    }
    $("[filters='__all'],[filters*='" + $(this).attr("filter") + "']").siblings('[use="list"]').trigger('click');
  })









  $("#formConfirm").on('click', function () {
    console.debug("Calling formConfirm.click()");
    $('input:not([type="checkbox"],[type="date"])[target-field]').each(function (_, element) {
      console.log($(element))
      var target = $(element).attr('target-field');
      var value = $(element).val();
      //console.debug("The target for '" + $(element).attr('id') + "' is '" + target + "', and has a value of '" + value + "'");
      $('span[target="' + target + '"]').each(function (_, span) {
        //console.log($(span)[0]);
        $(span).text(value);
      })
    });
    $('textarea[target-field]').each(function (_, element) {
      console.log($(element))
      var target = $(element).attr('target-field');
      var value = $(element).val();
      //console.debug("The target for '" + $(element).attr('id') + "' is '" + target + "', and has a value of '" + value + "'");
      $('span[target="' + target + '"]').each(function (_, span) {
        //console.log($(span)[0]);
        $(span).text(value);
      })
    });
    $("input[type='date'][target-field]").each(function(_, element) {
      var enteredDate = $(element).val().split("-");
      var target = $(element).attr('target-field');
      console.debug(enteredDate);
      $('span[target="' + target + '"]').each(function (_, span) {
        //console.log($(span)[0]);
        if ($(element).val().length != 10) {
          $(span).text("[Not a valid date]");
        }
        else {
          $(span).text(enteredDate[1] + "/" + enteredDate[2] + "/" + enteredDate[0]);
        }
      })
    });
    $('select[target-field]').each(function (_, element) {
      console.log($(element))
      var target = $(element).attr('target-field');
      var value = $(element).val();
      //console.debug("The target for '" + $(element).attr('id') + "' is '" + target + "', and has a value of '" + value + "'");
      $('span[target="' + target + '"]').each(function (_, span) {
        //console.log($(span)[0]);
        $(span).text(value);
      })
    });
    form.hide();
  });

  function setValue(element, value) {
    $(element).text(value);
  }

});