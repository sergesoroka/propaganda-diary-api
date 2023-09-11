export default async function getSubNarrativeCommonStatistic() {
  const res = await fetch(
    `https://vox-dashboard.ra-devs.tech/api/sub-narratives?lang=ua`
  );
  if (!res.ok) throw new Error("Fail to fetch data");
  return res.json();
}
