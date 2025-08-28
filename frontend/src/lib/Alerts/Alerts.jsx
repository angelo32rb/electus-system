import React from "react";
import Swal from "sweetalert2";
import "./alerts.css";

export default function Alerts(theme, alertMessage) {
  return new Promise(async (resolve, reject) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      iconColor: "#fff",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    const showToast = async () => {
      await Toast.fire({
        icon: theme,
        title: alertMessage,
      });
    };

    resolve(showToast());
  });
}
