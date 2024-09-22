import { ImageListType } from "react-images-uploading";

export interface SupplierDocumentProperty {
  type_pkid: number | null;
  name: string | null;
  file: ImageListType | null;
}

export const supplierDocumentInitialState: SupplierDocumentProperty = {
  type_pkid: null,
  name: null,
  file: null
}