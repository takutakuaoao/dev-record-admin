export interface Image {
  id: string;
  name: string;
  width: number;
  height: number;
  src: string;
}

export interface Images {
    images: Image[];
}
