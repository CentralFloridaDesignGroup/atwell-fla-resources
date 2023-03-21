$(document).ready(function(){

  var form = new bootstrap.Modal($("#modalForm")[0]);
  let searchParams = new URLSearchParams(window.location.search);
  if (!searchParams.has("skipform")) {
    form.show();
  }

  $("a[use='copy']").on('click', function() {
    var strOut = $(this).parent().children("[use='note']").text().trim().toUpperCase();
    navigator.clipboard.writeText(strOut);
    $("#toast-header").text("NOTE COPIED");
    $("#toast-body").text("The selected note was successfully copied to your clipboard!");
    new bootstrap.Toast($("#liveToast")[0]).show();
    console.debug(strOut);
  })












  $("#formConfirm").on('click', function() {
    console.debug("Calling formConfirm.click()");
    $('input:not([type="checkbox"])[target-field]').each(function(_, element) {
      console.log($(element))
      var target = $(element).attr('target-field');
      var value = $(element).val();
      console.debug("The target for '" + $(element).attr('id') + "' is '" + target + "', and has a value of '" + value + "'");
      $('span[target="' + target + '"]').each(function(_, span) {
        console.log($(span)[0]);
        $(span).text(value);
      })
    });
    form.hide();
  });

  function setValue(element, value) {
    $(element).text(value);
  }

});