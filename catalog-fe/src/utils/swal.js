import Swal from "sweetalert2";

const swalCustom = Swal.mixin({
  customClass: {
    popup: "rounded-2xl font-sans",
    confirmButton: "px-5 py-2.5 font-bold rounded-xl border-none",
    cancelButton: "px-5 py-2.5 font-bold rounded-xl border-none",
  },
  buttonsStyling: true,
});

export const successAlert = (title, text = "") => {
  return swalCustom.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#072B50",
  });
};

export const errorAlert = (title, text = "") => {
  return swalCustom.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#072B50",
  });
};

export const warningAlert = (title, text = "") => {
  return swalCustom.fire({
    icon: "warning",
    title,
    text,
    confirmButtonColor: "#072B50",
  });
};

export const confirmAlert = ({
  title,
  text,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  icon = "warning",
}) => {
  return swalCustom.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#072B50",
    cancelButtonColor: "#dc2626",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
};

export const loadingAlert = (
  title = "Mohon Tunggu...",
  text = "Sedang memproses permintaan Anda."
) => {
  return swalCustom.fire({
    title,
    text,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

const toastCustom = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const toastSuccess = (title) => {
  return toastCustom.fire({
    icon: "success",
    title,
  });
};

export const toastError = (title) => {
  return toastCustom.fire({
    icon: "error",
    title,
  });
};
