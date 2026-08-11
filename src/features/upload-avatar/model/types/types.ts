export type UploadAvatarType = {
  userId: string,
  image: string | null
}

export interface AvatarUploadLabels {
  description: string;
  resetButton: string;
  sendButton: string;
}