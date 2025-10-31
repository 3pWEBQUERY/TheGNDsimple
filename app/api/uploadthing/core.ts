import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  galleryImage: f({
    // Use 16MB literal (allowed by types), enforce 10MB client-side
    image: { maxFileSize: "16MB", maxFileCount: 50 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),

  escortMedia: f({
    // Use 16MB for images, 256MB for videos, enforce 10MB/200MB client-side
    image: { maxFileSize: "16MB", maxFileCount: 50 },
    video: { maxFileSize: "256MB", maxFileCount: 50 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
