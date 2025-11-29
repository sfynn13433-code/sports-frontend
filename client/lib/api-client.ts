const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface PredictionResponse {
  match: string;
  predictions: {
    market: string;
    team?: string;
    probability: number;
    suggestedBet: string;
  }[];
  modelVersion: string;
}

export class ApiClient {
  static async getPredictions(): Promise<PredictionResponse[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/predictions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle both array and single object responses
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
      throw error;
    }
  }

  static async getPredictionsByMatch(matchId: string): Promise<PredictionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/predictions/${matchId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch prediction for match ${matchId}:`, error);
      throw error;
    }
  }
}
