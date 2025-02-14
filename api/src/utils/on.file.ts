import { unlink, createWriteStream } from "node:fs";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { MultipartValue, type Multipart } from "@fastify/multipart";
import { logger } from "config";

const pump = promisify(pipeline);
const remove = promisify(unlink);

const customDirname = fileURLToPath(new URL(".", import.meta.url));

export async function onFile<T extends Record<string, unknown>>(parts: AsyncIterableIterator<Multipart>) {
  const data: { files: string[]; fields: T } = { files: [], fields: {} as T };
  for await (const part of parts) {
    if (part.type === "file") {
      const randomizedName = `${randomUUID()}_${part.filename}`;
      const fullPath = join(customDirname, "../../Uploads", randomizedName);
      await pump(part.file, createWriteStream(fullPath));
      data.files.push(randomizedName);
    } else {
      Object.assign(data.fields, { [part.fieldname]: (part.fields[part.fieldname] as MultipartValue<string>).value });
    }
  }
  return data;
}

export async function removeFileFromUploads(files: string[] | string | null | undefined) {
  if (!files) return;
  if (Array.isArray(files)) {
    for (const file of files) {
      try {
        await remove(join(customDirname, "../../Uploads", file));
      } catch (error) {
        logger.error(error);
      }
    }
  } else {
    try {
      await remove(join(customDirname, "../../Uploads", files));
    } catch (error) {
      logger.error(error);
    }
  }
}
