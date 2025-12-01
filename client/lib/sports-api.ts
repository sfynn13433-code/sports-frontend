export interface Team {
  idTeam: string;
  strTeam: string;
  strLeague: string;
  strBadge?: string;
}

export interface TeamsResponse {
  teams: Team[];
}

export class SportsDBAPI {
  private static readonly BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

  static async getTeams(league: string = 'English Premier League'): Promise<Team[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/search_all_teams.php?l=${encodeURIComponent(league)}`,
        {
          method: 'GET',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // TheSportsDB returns teams array or null
      if (!data.teams || !Array.isArray(data.teams)) {
        return [];
      }

      // Sort teams alphabetically and limit to top teams for better UX
      return data.teams
        .sort((a: Team, b: Team) => a.strTeam.localeCompare(b.strTeam))
        .slice(0, 50); // Limit to 50 teams for dropdown performance
    } catch (error) {
      console.error('Failed to fetch teams from TheSportsDB:', error);
      throw error;
    }
  }
}
