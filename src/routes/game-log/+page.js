export const load = async ({ fetch, url }) => {
  const endpoint = `?patch=${url.searchParams.get('patch')}`;
  const gamesRes = await fetch(`/api/games${endpoint}`);
  const games = await gamesRes.json();

  return {
    games // eventually we'll remove this 
  };
};
