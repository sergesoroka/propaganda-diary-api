export default async function getSubNarrativeData(
  locale: string,
  per_page?: string
) {
  const res = await fetch(
    `https://vox-dashboard.ra-devs.tech/api/sub-narratives?lang=${locale}&per_page=300`
  );
  if (!res.ok) throw new Error("Fail to fetch data");
  return res.json();
}
