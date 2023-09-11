export default async function getMediaData(locale: string, per_page?: string) {
  const res = await fetch(
    `https://vox-dashboard.ra-devs.tech/api/dashboards?lang=${locale}`
  );
  if (!res.ok) throw new Error("Fail to fetch data");
  return res.json();
}
