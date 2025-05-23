import { saveAs } from "file-saver";

//
/// 파일다운로드
export default function onFileDownload(file: { title: string; file: string }) {
  if (!file.file) {
    console.error("File URL is missing");
    return Promise.reject("File URL is missing");
  }

  return fetch(file.file)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const fileName = file.title; // 파일명을 file.title로 설정
      saveAs(blob, fileName);
    })
    .catch((error) => {
      console.error("Error downloading the file:", error);
    });
}
