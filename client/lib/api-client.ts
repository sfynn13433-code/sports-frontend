const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://predictions-backend-1.onrender.com';
const SPORT_PREDICTIONS_API = 'https://predictions-backend-3e9a.onrender.com';
const SPORTRADER_API_KEY = 'x94LrpeQy3S6qpl7Icic7w5Y9NZBKGZa3JPw4K80';

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
  sport: string;
  fetchedAt: string;
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
      // Normalize sport name to lowercase
      const sportParam = sport.toLowerCase().replace(/\s+/g, '');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 15000); // 15-second timeout

      try {
        const response = await fetch(
          `${SPORT_PREDICTIONS_API}/api/predictions-by-sport?sport=${encodeURIComponent(sportParam)}`,
          {
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${SPORTRADER_API_KEY}`,
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          // Handle 5xx errors with fallback mock data
          if (response.status >= 500 && response.status < 600) {
            console.warn(
              `Backend returned ${response.status} error for sport: ${sport}. Using mock data.`
            );
            return ApiClient.getMockPredictions(sport);
          }
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data: SportPredictionsResponse = await response.json();

        return {
          data: data.data || [],
          expertConclusion: data.expertConclusion || 'Predictions will be available shortly.',
          sport: data.sport || sport,
          fetchedAt: data.fetchedAt || new Date().toISOString(),
        };
      } catch (fetchError) {
        clearTimeout(timeoutId);

        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.warn(`Backend request timeout for sport: ${sport}. Using mock data.`);
          return ApiClient.getMockPredictions(sport);
        }

        if (fetchError instanceof TypeError) {
          console.warn(
            `Connection error for sport: ${sport}. Using mock data.`,
            fetchError.message
          );
          return ApiClient.getMockPredictions(sport);
        }

        // Re-throw other errors to be caught by outer catch
        throw fetchError;
      }
    } catch (error) {
      // Fallback for any unexpected errors
      console.error('Failed to fetch sport predictions:', error);
      const sport_param = sport.toLowerCase().replace(/\s+/g, '');
      return ApiClient.getMockPredictions(sport_param);
    }
  }

  static getMockPredictions(sport: string): SportPredictionsResponse {
    const mockData: Record<string, SportPrediction[]> = {
      football: [
        {
          id: '1',
          matchup: 'Manchester City vs Liverpool',
          prediction: 'Manchester City will win',
          confidence: 0.72,
          textCommentary: 'Strong home form and recent winning streak supports this prediction.',
        },
        {
          id: '2',
          matchup: 'Arsenal vs Chelsea',
          prediction: 'Both teams to score',
          confidence: 0.68,
          textCommentary: 'Recent games show both sides are attacking-minded.',
        },
      ],
      rugby: [
        {
          id: '1',
          matchup: 'England vs France',
          prediction: 'England by 10+ points',
          confidence: 0.65,
          textCommentary: 'Home advantage and defensive strength are key factors.',
        },
      ],
      tennis: [
        {
          id: '1',
          matchup: 'Djokovic vs Alcaraz',
          prediction: 'Alcaraz to win in 3 sets',
          confidence: 0.58,
          textCommentary: 'Younger player showing impressive form on hard courts.',
        },
      ],
      basketball: [
        {
          id: '1',
          matchup: 'Lakers vs Celtics',
          prediction: 'Celtics by 5+ points',
          confidence: 0.62,
          textCommentary: 'Better three-point shooting and defensive intensity.',
        },
      ],
      icehockey: [
        {
          id: '1',
          matchup: 'Maple Leafs vs Avalanche',
          prediction: 'Avalanche to win',
          confidence: 0.59,
          textCommentary: 'Better goal-scoring efficiency in recent games.',
        },
      ],
      snooker: [
        {
          id: '1',
          matchup: 'Selby vs Trump',
          prediction: 'Selby by 2 frames',
          confidence: 0.61,
          textCommentary: 'Recent form favors Selby in competitive matches.',
        },
      ],
    };

    const sportLower = sport.toLowerCase().replace(/\s+/g, '');
    const predictions = mockData[sportLower] || mockData['football'];

    return {
      data: predictions,
      expertConclusion: `These are sample predictions for ${sport}. Live data will appear once the backend is fully configured. Our AI analyzes team form, player stats, and historical matchups to generate confidence-weighted predictions.`,
      sport: sport,
      fetchedAt: new Date().toISOString(),
    };
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
