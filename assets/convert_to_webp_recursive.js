const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Directorio de entrada y salida
const inputDir = path.resolve(__dirname, "public");
const outputDir = path.resolve(__dirname, "public-webp");

// Crear el directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Función para convertir imágenes a WEBP
const convertToWebp = (inputPath, outputPath) => {
  sharp(inputPath)
    .webp()
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.error("Error converting image:", err);
      } else {
        console.log("Converted", inputPath, "to", outputPath);
      }
    });
};

// Función para copiar archivos no convertidos
const copyFile = (inputPath, outputPath) => {
  fs.copyFile(inputPath, outputPath, (err) => {
    if (err) {
      console.error("Error copying file:", err);
    } else {
      console.log("Copied", inputPath, "to", outputPath);
    }
  });
};

// Función para procesar directorios recursivamente
const processDirectory = (dir, outDir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const outPath = path.join(outDir, file);
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }

        if (stats.isDirectory()) {
          if (!fs.existsSync(outPath)) {
            fs.mkdirSync(outPath, { recursive: true });
          }
          processDirectory(fullPath, outPath);
        } else if (stats.isFile()) {
          const ext = path.extname(file).toLowerCase();
          if (ext === ".webp" || ext === ".webp" || ext === ".webp") {
            const webpPath = outPath.replace(ext, ".webp");
            convertToWebp(fullPath, webpPath);
          } else {
            copyFile(fullPath, outPath);
          }
        }
      });
    });
  });
};

// Iniciar el procesamiento del directorio
processDirectory(inputDir, outputDir);
