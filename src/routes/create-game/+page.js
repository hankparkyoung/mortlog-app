export const load = async ({ fetch }) => {
  const unitsWithTraitsRes = await fetch('/api/units/with-traits');
  const units = await unitsWithTraitsRes.json();

  const traitBreakpointsRes = await fetch('/api/trait-breakpoints/with-names');
  const breakpoints = await traitBreakpointsRes.json();

  const encountersRes = await fetch('/api/encounters');
  const encounters = await encountersRes.json();

  const hacksRes = await fetch('/api/hacks');
  const hacks = await hacksRes.json();

  const augmentsRes = await fetch('/api/augments');
  const augments = await augmentsRes.json();

  return {
    units,
    breakpoints,
    encounters,
    hacks,
    augments
  };
};