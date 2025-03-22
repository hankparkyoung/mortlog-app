export const load = async ({ fetch }) => {
  const response = await fetch('/api/units/with-traits');
  const units = await response.json();
  return {
    units,
  }
}