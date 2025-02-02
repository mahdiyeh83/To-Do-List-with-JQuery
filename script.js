$(document).ready(function () {
  $("#taskTitle").on("input", function () {
      const title = $(this).val();
      $("#addTask").text(title || "+");
  });

  $("#date-picker").persianDatepicker();
  let draggedTask = null;
  let currentTask = null;

  function dragOver(event) {
      event.preventDefault();
  }

  function drop(event, column) {
      event.preventDefault();
      if (draggedTask) {
          $(column).append(draggedTask);
      } else {
          const title = $("#taskTitle").val();
          if ($.trim(title) === "") {
              alert("لطفاً عنوانی وارد کنید!");
              return;
          }
          const task = $(`<div class="task" draggable="true">
            <div class="edit-buttons">
              <span>${title}</span>
              <button class="edit-btn" style="border: 0cm; background-color: white;">✏️</button>
              <button class="delete-btn" style="border: 0cm; background-color: white;">❌</button>
             </div> 
          </div>`);

          task.data("description", $("#taskDescription").val());

          task.on("dragstart", function (event) {
              draggedTask = task;
              event.originalEvent.dataTransfer.setData("text/plain", title);
          });

          task.find(".edit-btn").on("click", function (e) {
              e.stopPropagation();
              currentTask = task;
              $("#editTitle").val(title);
              $("#editDescription").val(task.data("description") || "");
              $("#editModal").modal("show");
          });

          task.find(".delete-btn").on("click", function (e) {
              e.stopPropagation();
              task.remove();
          });

          $(column).append(task);
          $("#taskTitle").val("");
          $("#taskDescription").val("");
          $("#addTask").text("+");
      }
  }

  $("#urgent, #nonUrgent")
      .on("dragover", dragOver)
      .on("drop", function (event) {
          drop(event, this);
      });

  $(document).on("dragend", function () {
      draggedTask = null;
  });

  $("#saveTask").on("click", function () {
      if (currentTask) {
          const newTitle = $("#editTitle").val();
          const newDescription = $("#editDescription").val();
          currentTask.html(`<div class="edit-buttons">
            <span>${newTitle}</span>
            <button class="edit-btn" style="border: 0cm; background-color: white;">✏️</button>
            <button class="delete-btn" style="border: 0cm; background-color: white;">❌</button>
            </div>
              `);
          currentTask.data("description", newDescription);

          currentTask.find(".delete-btn").on("click", function (e) {
              e.stopPropagation();
              currentTask.remove();
          });

          currentTask.find(".edit-btn").on("click", function (e) {
              e.stopPropagation();
              currentTask = $(this).closest(".task");
              $("#editTitle").val(newTitle);
              $("#editDescription").val(newDescription);
              $("#editModal").modal("show");
          });

          $("#editModal").modal("hide");
      }
  });
});