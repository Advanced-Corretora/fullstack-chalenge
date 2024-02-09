export async function getNewPokemon() {
  try {
    const ramdomNumber = Math.floor(Math.random() * 100) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${ramdomNumber}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
}
