$(document).ready(function () {
  // Initialize Persian Datepicker
  $("#date-picker").pDatepicker({
    format: "YYYY/MM/DD",
    autoClose: true,
  });

  $("#addTask").click(function () {
    const title = $("#taskTitle").val().trim();
    const description = $("#taskDescription").val().trim();
    const date = $("#date-picker").val();

    if (title === "" || description === "" || date === "") {
      alert("لطفاً همه فیلدها را پر کنید!");
      return;
    }

    const task = `
          <div class="task card mb-3">
              <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${description}</p>
                  <small class="text-muted">تاریخ: ${date}</small>
              </div>
          </div>
      `;

    $("#nonUrgent").append(task);
    clearForm();
  });

  $(".card-body")
    .sortable({
      connectWith: ".card-body",
      placeholder: "ui-state-highlight",
      start: function (event, ui) {
        ui.item.addClass("dragging");
      },
      stop: function (event, ui) {
        ui.item.removeClass("dragging");
      },
    })
    .disableSelection();

  function clearForm() {
    $("#taskTitle").val("");
    $("#taskDescription").val("");
    $("#date-picker").val("");
  }
});
