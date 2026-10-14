import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Hot Coffee";
    };
  }, [title]);
};

export default useTitle;
