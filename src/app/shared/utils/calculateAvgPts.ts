import { IdentifiedTeams } from '../models/teams';

export function calculateAvgGamePts(
  team: 'currentTeam' | 'opponentTeam',
  identifiedTeams: IdentifiedTeams[]
): number {
  const teamScores: number[] = identifiedTeams.map((el) => el[team].score);
  const avgPts: number =
    teamScores.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    ) / teamScores.length;
  return avgPts;
}
