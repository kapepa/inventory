import { UploadAvatarType } from "./types";

export interface UploadAvatarParmas {
  data: UploadAvatarType,
  signal?: AbortSignal,
}
