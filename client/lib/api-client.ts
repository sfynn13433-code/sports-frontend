const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sports-backend-hq07.onrender.com';

export interface GoalMarket {
  type: string;
  probability: string;
  odds: string;
  suggestedBet: string;
}

export interface WinnerPrediction {
  team: string;
  probability: string;
  odds: string;
  suggestedBet: string;
}

export interface PredictionData {
  match: string;
  league: string;
  predictions: {
    winner: WinnerPrediction;
    goals: GoalMarket[];
  };
}

export class ApiClient {
  static async getPredictions(): Promise<PredictionData[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

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

      const data = await response.json();

      // Handle both array and single object responses
      return Array.isArray(data) ? data : [data];
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

  static async getPredictionsByMatch(matchId: string): Promise<PredictionData> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/api/predictions/${matchId}`, {
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

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        const corsError = new Error(
          `CORS Error: Unable to reach ${API_BASE_URL}. The backend may not be accessible or CORS is not properly configured.`
        );
        console.error(corsError.message);
        throw corsError;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError = new Error(`Timeout: The backend server took too long to respond.`);
        console.error(timeoutError.message);
        throw timeoutError;
      }

      console.error(`Failed to fetch prediction for match ${matchId}:`, error);
      throw error;
    }
  }
}
