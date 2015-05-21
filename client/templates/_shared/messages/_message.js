Template._message.helpers({
  messageIcon: function () {
    var icon = "fa-info-circle";
    switch (Session.get("messageType")) {
      case "success":
        icon = "fa-check";
        break;
      case "info":
        icon = "fa-info";
        break;
      case "warning":
        icon = "fa-exclamation-triangle";
        break;
      case "danger":
        icon = "fa-exclamation";
        break;
    }
    return icon;
  }
});
