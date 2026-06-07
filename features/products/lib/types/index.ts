export interface ProductApiResponse {
  id: string;
  name: string;
  internalRef: string;
  salesPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsResponse {
  status: string;
  message: string;
  results: number;
  data: ProductApiResponse[];
}

export interface CreateProductDto {
  name: string;
  internalRef: string;
  salesPrice: number;
}
