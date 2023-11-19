import { writeFile, readFile, readdir, unlink } from "fs/promises";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { join, extname, dirname } from "path";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useRef, useState } from "react";
import { randomUUID } from "crypto";
import prisma from "./prismaClientGlobal";
import { getSessionIfNotNull } from "./auth";
import { getFilename } from "@/hooks/getFilename";

type Ifiles = File | null;
type Filedata = Buffer;
type FileconversionType = string;
type FileURLType = string;

export const ffmpegClient = async (
  file: Ifiles,
  filedata: Filedata,
  conversionexttype: FileconversionType,
  convesionURLType: FileURLType
) => {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const session = getSessionIfNotNull();
  try {
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${String(process.env.FFMPEG_BASEURL)}/ffmpeg-core.js`,
        "text/javascript"
      ),
      wasmURL: await toBlobURL(
        `${String(process.env.FFMPEG_BASEURL)}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    let filename = getFilename(file?.name as string);
    let randName = filename + "_" + randomUUID();
    let filePath = join("/public/input/" + file?.name);
    let newFileExt = randName + "." + conversionexttype;
    await writeFile(filePath, filedata);
    // await ffmpeg.writeFile('input.avi', await fetchFile('video-15s.avi'))
    await ffmpeg.exec(["-i", filePath, newFileExt]);
    const data = (await ffmpeg.readFile(newFileExt)) as any;
    let convertURL = URL.createObjectURL(
      new Blob([data.buffer], { type: convesionURLType })
    );
    if (convertURL && session?.user?.email != null) {
      prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        select: {},
      });
    }
    return convertURL;
  } catch {
    return "Not converted";
  }
};
