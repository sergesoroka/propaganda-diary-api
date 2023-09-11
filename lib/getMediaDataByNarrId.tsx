export default async function getMediaDataByNarrId(
  locale: string,
  narrative_id?: string
) {
  const res = await fetch(
    `https://vox-dashboard.ra-devs.tech/api/dashboards?lang=${locale}&narrative_id=${narrative_id}`
  );
  if (!res.ok) throw new Error("Fail to fetch data");
  return res.json();
}
