import React from "react";

const Loader = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <div className={[`mx-auto h-full w-full animate-spin rounded-full border-4 border-primary-50 border-t-primary-500`].join(" ")} />{" "}
    </div>
  );
};

export default Loader;
