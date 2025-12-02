const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://predictions-backend-1.onrender.com';
const SPORT_PREDICTIONS_API = 'https://predictions-backend-3e9a.onrender.com';

export interface Prediction {
  id: number;
  title: string;
  confidence: number;
}

export interface SportPrediction {
  id?: string | number;
  matchup: string;
  homeTeam?: string;
  awayTeam?: string;
  prediction: string;
  confidence: number;
  winProbability?: number;
  textCommentary?: string;
  [key: string]: any;
}

export interface SportPredictionsResponse {
  data: SportPrediction[];
  expertConclusion: string;
  sport?: string;
  timestamp?: string;
}

export interface PredictionResponse {
  predictions: Prediction[];
}

export interface PredictionRequest {
  teamA: string;
  teamB: string;
}

export class ApiClient {
  static async getPredictionsBySport(sport: string): Promise<SportPredictionsResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        `${SPORT_PREDICTIONS_API}/api/predictions-by-sport?sport=${encodeURIComponent(sport)}`,
        {
          method: 'GET',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: SportPredictionsResponse = await response.json();

      return {
        data: data.data || [],
        expertConclusion: data.expertConclusion || 'Predictions will be available shortly.',
        sport: data.sport || sport,
        timestamp: data.timestamp,
      };
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        const corsError = new Error(
          `CORS Error: Unable to reach ${SPORT_PREDICTIONS_API}. The backend may not be accessible or CORS is not properly configured. Please ensure the backend server is running and has CORS enabled.`
        );
        console.error(corsError.message);
        throw corsError;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError = new Error(
          `Timeout: The backend server took too long to respond. Please check if the server is running.`
        );
        console.error(timeoutError.message);
        throw timeoutError;
      }

      console.error('Failed to fetch sport predictions:', error);
      throw error;
    }
  }

  static async getPredictions(): Promise<Prediction[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/api/predictions`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: PredictionResponse = await response.json();

      return data.predictions || [];
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        const corsError = new Error(
          `CORS Error: Unable to reach ${API_BASE_URL}. The backend may not be accessible or CORS is not properly configured. Please ensure the backend server is running and has CORS enabled.`
        );
        console.error(corsError.message);
        throw corsError;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError = new Error(
          `Timeout: The backend server took too long to respond. Please check if the server is running.`
        );
        console.error(timeoutError.message);
        throw timeoutError;
      }

      console.error('Failed to fetch predictions:', error);
      throw error;
    }
  }

  static async predictMatch(teamA: string, teamB: string): Promise<Prediction> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          teamA,
          teamB,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Handle the response - could be a single prediction or wrapped in an object
      if (data.prediction) {
        return data.prediction;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        const corsError = new Error(
          `CORS Error: Unable to reach ${API_BASE_URL}. The prediction backend may not be accessible.`
        );
        console.error(corsError.message);
        throw corsError;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError = new Error(
          `Timeout: The prediction request took too long to process.`
        );
        console.error(timeoutError.message);
        throw timeoutError;
      }

      console.error('Failed to get prediction:', error);
      throw error;
    }
  }
}
