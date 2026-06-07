export interface PharmacyApiResponse {
  id: string;
  name: string;
  city: string;
  subRegion: string;
  region: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetPharmaciesResponse {
  status: string;
  message: string;
  results: number;
  data: PharmacyApiResponse[];
}

export interface CreatePharmacyDto {
  name: string;
  city: string;
  subRegion: string;
  region: string;
  country: string;
}
