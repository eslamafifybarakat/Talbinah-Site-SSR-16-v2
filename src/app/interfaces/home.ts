export interface homeApiResponse {
  message: string | null;
  status: boolean;
  data: {
    doctors: Doctor;
    latestArticles: Article;
    reviews: Rating;
    specialists: Specialty;
  }
}
export interface HomeData {
  doctors: Doctor;
  latestArticles: Article;
  reviews: Rating;
  specialists: Specialty;
}
export interface Doctor {
  id: number;
  full_name: string;
  specialist: string[];
  bio: string;
  gender: number;
  reservation_count: number;
  avg_rate: number;
  count_rate: number;
  image: string;
  price_half_hour: number;
  years_experience: number;
  copouns: any[]; // You might want to define a type for coupons if they have a specific structure
  nextAvailability: {
    id: number;
    doctor_id: number;
    day_id: number;
    date: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
  };
}
export interface Rating {
  id: number;
  rating: number;
  description: string;
  user_name: string;
  date: string;
}
export interface Article {
  id: number;
  title: string;
  image: string | null;
  category: string;
  description: string;
  reading_time: number;
  created_at: Date | null;
}

interface Specialty {
  id: number;
  name: string;
  image: string;
}


export interface Feature {
  id: number;
  image: string | null;
  title: string;
  description: string;
  link: string;
}
