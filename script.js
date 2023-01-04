const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  //preventing form from submitting
  e.preventDefault();
  downloadBtn.innerText = "Downloading File...";
  fetchFile(fileInput.value);
});

function fetchFile(url) {
  // fetching HOTS file & 5 returning response as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      // URL. createObjURL creates a url of passed object

      let tempUrl = URL.createObjectURL(file);

      let aTag = document.createElement("a");
      // passing tempUrl as href value of <a> tag

      aTag.href = tempUrl;
      // passing file last name and extension as download value of <a> tag

      aTag.download = url.replace(/^.*[\\\/]/, "");
      //adding <a> tag inside body

      document.body.appendChild(aTag);
      // clicking <a> tag so the file download
      aTag.click();
      //  removing <a> tag once file downloaded

      aTag.remove();

      URL.revokeObjectURL(tempUrl);
      console.log(downloadBtn.innerText);
      setTimeout(() => {
        if (downloadBtn.innerText === "Downloading File...")
          downloadBtn.innerText = "Download File";
      }, 1000);
      console.log(tempUrl);
    })
    .catch(() => {
      // catch method will call if any error comes during downloading
      downloadBtn.innerText = "DownloadFile";
      alert("Failed to Download File!");
    });
}
