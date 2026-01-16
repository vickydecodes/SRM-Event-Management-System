export const resolveIds = (entity) => {
  if (!entity) return [];

  if (Array.isArray(entity)) {
    return entity
      .filter((el) => el && typeof el === "object" && "_id" in el)
      .map((el) => el._id);
  }

  if (entity && typeof entity === "object" && "_id" in entity) {
    return [entity._id];
  }

  return Array.isArray(entity) ? entity.filter((id) => typeof id === "string") : [];
};

export function camelToTitle(str = '') {
  return str
    // insert space before capital letters
    .replace(/([A-Z])/g, ' $1')
    // handle snake_case just in case
    .replace(/_/g, ' ')
    // trim & capitalize each word
    .replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.slice(1)
    )
    .trim();
}


export const capitalize = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const money = (v) => Number(v || 0).toLocaleString();

export const normalizeFileType = (mime = "") => {
  const map = {
    "image/jpeg": "JPEG Image",
    "image/jpg": "JPG Image",
    "image/png": "PNG Image",
    "image/gif": "GIF Image",
    "image/webp": "WEBP Image",

    "application/pdf": "PDF File",
    "application/msword": "Word Document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "Word Document (DOCX)",
    "application/vnd.ms-excel": "Excel Spreadsheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "Excel Spreadsheet (XLSX)",
    "application/vnd.ms-powerpoint": "PowerPoint Presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "PowerPoint Presentation (PPTX)",

    "text/plain": "Text File",
    "text/csv": "CSV File",

    "audio/mpeg": "MP3 Audio",
    "audio/wav": "WAV Audio",

    "video/mp4": "MP4 Video",
    "video/x-matroska": "MKV Video",
  };

  return map[mime] || guessFallback(mime);
};

// Generic fallback
const guessFallback = (mime) => {
  const parts = mime.split("/");
  return parts[1]?.toUpperCase() || "FILE";
};
