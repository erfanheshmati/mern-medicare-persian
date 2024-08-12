import path from "path";

export const uploadAvatar = async (req, res) => {
  // if (req.files === null || undefined)
  // return res.status(400).json({ message: "File has not been uploaded" });

  const file = req.files.photo;
  const newFileName = `${new Date().getTime()}-${file.name.replaceAll(
    " ",
    "-"
  )}`;

  const __dirname = path.resolve();
  const uploadPath = path.join(
    __dirname,
    "..",
    "frontend",
    "public",
    "uploads"
  );

  file.mv(`${uploadPath}/${newFileName}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err });
    }
  });

  res.json({
    fileName: newFileName,
    filePath: `/uploads/${newFileName}`,
  });
};
