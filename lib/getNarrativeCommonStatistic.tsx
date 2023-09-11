export default async function getNarrativeCommonStatistic() {
  const res = await fetch(
    `https://vox-dashboard.ra-devs.tech/api/narratives?lang=ua`
  );
  if (!res.ok) throw new Error("Fail to fetch data");
  return res.json();
}
