$(document).ready(function () {
  $("#taskTitle").on("input", function () {
      const title = $(this).val();
      $("#addTask").text(title || "+");
  });

  $("#date-picker").persianDatepicker();

  $("#addTask").draggable();
});
