import { Button } from "@/components/Button";
import React from "react";
import { toast, Toaster } from "react-hot-toast";

const Details = () => {
  const showToast = () => toast("Here is a basic toast message.");
  console.log(showToast);

  return (
    <div className="pl-14 pt-20">
      <Button size="lg" onClick={showToast}>
        Basic Toast
      </Button>
      <Toaster />
    </div>
  );
};

export default Details;
