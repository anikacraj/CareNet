// utils/tools.ts

export function getWeatherDetails(city: string = ''): string {
  const lower = city.toLowerCase();
  switch (lower) {
    case 'sylhet':
    case 'rongpur':
    case 'borisal':
      return '21°C';
    case 'dhaka':
      return '25°C';
    default:
      return 'Unknown';
  }
}
