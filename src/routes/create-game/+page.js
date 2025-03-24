export const load = async ({ fetch }) => {
  const unitsWithTraitsRes = await fetch('/api/units/with-traits');
  const units = await unitsWithTraitsRes.json();

  const traitBreakpointsRes = await fetch('/api/trait-breakpoints/with-names');
  const breakpoints = await traitBreakpointsRes.json();

  const encountersRes = await fetch('/api/encounters');
  const encounters = await encountersRes.json();
  return {
    units,
    breakpoints,
    encounters
  }
}