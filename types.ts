export interface Listing {
  id: number;
  authorId: number;
  title: string;
  description: string;
  country: string;
  state: string;
  city: string;
  type: string;
  location: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  eventDate: string;
  eventTime: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LocationData {
  [country: string]: {
    [state: string]: string[];
  };
}
