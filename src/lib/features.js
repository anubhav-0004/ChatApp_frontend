export const fileFormat = (url = "") => {
  const cleanUrl = url.split("?")[0].split("#")[0];
  const fileExt = cleanUrl.split(".").pop().toLowerCase();

  if (["png", "jpg", "jpeg", "gif", "svg"].includes(fileExt)) {
    return "image";
  }
  if (["mp4", "mkv", "avi", "webm", "ogg"].includes(fileExt)) {
    return "video";
  }
  if (["mp3", "wav", "flac"].includes(fileExt)) {
    return "audio";
  }
  if (["pdf"].includes(fileExt)) {
    return "pdf";
  }
  return "file";
};
