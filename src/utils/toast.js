import { toast } from "react-hot-toast";

export const showSuccessToast = (title) => {
  console.log(title);
  toast.dismiss();
  toast.success(title, {
    position: "bottom-center",
    style: {
      position: "relative",
      bottom: "50px",
      maxWidth: "500px",
    },
  });
};

export const showErrorToast = () => {
  toast.dismiss();
  toast.error("Something went wrong", {
    position: "bottom-center",
    style: {
      position: "relative",
      bottom: "50px",
      maxWidth: "500px",
    },
  });
};

export const showWarningToast = () => {
  toast.dismiss();
  toast.warning("Item already in Cart", {
    position: "bottom-center",
    style: {
      position: "relative",
      bottom: "50px",
      maxWidth: "500px",
    },
  });
};
