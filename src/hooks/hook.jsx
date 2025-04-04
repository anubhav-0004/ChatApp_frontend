import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]);
};


const useInfiniteScroll = (containerRef, totalPages, pageNum, setPage, oldMessages) => {
  const [data, setData] = useState([]);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0); 

  useEffect(() => {
    if (oldMessages?.length) {
      setData((prevData) => [...oldMessages, ...prevData]); 
    }
  }, [oldMessages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (pageNum >= totalPages) return;

      // If user scrolls to top, load more messages
      if (container.scrollTop < 20) {
        setPrevScrollHeight(container.scrollHeight); 
        setPage((prev) => Math.min(prev + 1, totalPages));
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef, pageNum, totalPages, setPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (prevScrollHeight > 0) {
      container.scrollTop = container.scrollHeight - prevScrollHeight;
    }
  }, [data, prevScrollHeight]);

  return { data, setData };
};

export { useErrors, useSocketEvents, useInfiniteScroll };
