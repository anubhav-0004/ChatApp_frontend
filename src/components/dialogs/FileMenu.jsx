import React, { useCallback } from "react";
import { FaVideo } from "react-icons/fa";
import { FiFile } from "react-icons/fi";
import { IoImageSharp } from "react-icons/io5";
import { MdAudioFile } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/reduxAPI";

const FileMenu = ({chatId}) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);
  const [sendAttachments] = useSendAttachmentsMutation();

  const fileChangeHandler = useCallback(
    async (e, type) => {
      const files = Array.from(e.target.files);
      if (files.length < 1) return;
      if (files.length > 5)
        toast.error(`You can send only 5 ${type} at a time.`);
      dispatch(setUploadingLoader(true));
      dispatch(setIsFileMenu(false));

      const toastId = toast.loading(`Sending ${type}...`);

      try {
        const myForm = new FormData();
        myForm.append("chatId", chatId);
        files.forEach((file) => myForm.append("files", file));
        const res = await sendAttachments(myForm);

        if (res.data)
          toast.success(`${type} sent successfully.`, { id: toastId });
        else toast.error(`Failed to send ${type}`, { id: toastId });
      } catch (error) {
        toast.error(error, { id: toastId });
      } finally {
        dispatch(setUploadingLoader(false));
      }
    },
    [dispatch]
  );

  if (!isFileMenu) return null;

  return (
    <div className="absolute gap-2 flex flex-col bg-[#48485ae1] bottom-[8%] min-w-28 min-h-24 p-2 rounded-md border border-[#6d6d75] z-50">
      {[
        {
          id: "image-upload",
          icon: <IoImageSharp />,
          label: "Image",
          accept: "image/*",
        },
        {
          id: "audio-upload",
          icon: <MdAudioFile />,
          label: "Audio",
          accept: "audio/*",
        },
        {
          id: "video-upload",
          icon: <FaVideo />,
          label: "Video",
          accept: "video/*",
        },
        { id: "file-upload", icon: <FiFile />, label: "File", accept: "*" },
      ].map(({ id, icon, label, accept }) => (
        <div key={id}>
          <label htmlFor={id} className="flex gap-x-2 cursor-pointer">
            {icon}
            <span className="text-slate-300">{label}</span>
          </label>
          <input
            id={id}
            type="file"
            multiple
            accept={accept}
            style={{ display: "none" }}
            onChange={(e) => fileChangeHandler(e, label)}
          />
        </div>
      ))}
    </div>
  );
};

export default FileMenu;
