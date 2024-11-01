import { useMemo } from "react";

export function usePokemonData(data, krData) {
  const pokemonData = useMemo(() => {
    if (!data || !krData) return null;

    return {
      /* data */
      id: data.id,
      name: data.name,
      properties: data.types.map((type) => type.type.name),
      abilities: data.abilities.map((ability) => ability.ability.name),
      height: data.height / 10, // meter 단위
      weight: data.weight / 10, // kg 단위
      imageUrl: {
        mainImg: data.sprites.other.dream_world.front_default,
        frontGif: data.sprites.other.showdown.front_default,
        backGif: data.sprites.other.showdown.back_default,
      },
      baseExp: data.base_experience,
      stats: data.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
      }, {}),

      /* krData */
      krName: krData.names.find((nameData) => nameData.language.name === "ko")
        ?.name,
      krFlavorText: krData.flavor_text_entries
        .filter((entry) => entry.language.name === "ko")
        .map((entry) => entry.flavor_text),
      captureRate: krData.capture_rate,
      color: krData.color.name,
    };
  }, [data, krData]);

  return pokemonData;
}
