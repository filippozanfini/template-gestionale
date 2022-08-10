import React from "react";
import Loader from "../core/Loader";

const Overlay = ({ loading, text = "Salvataggio in corso" }: { loading: boolean; text?: string }) => {
  return loading ? (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <Loader className="h-16 w-16" />
      <span className="text-2xl">{text}</span>
    </div>
  ) : null;
};

export default Overlay;
