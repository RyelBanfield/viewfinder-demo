export type ImageType = {
  id: string;
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  url: string;
  createdAt: Date;
};

export type UserType = {
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  imagesUploaded: number;
};
