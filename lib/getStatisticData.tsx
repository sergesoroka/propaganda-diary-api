export default async function getStatisticData() {
  const res = await fetch(
    `https://vox-dashboard.ra-devs.tech/api/dashboards-statistic`
  );
  if (!res.ok) throw new Error("Fail to fetch data");
  return res.json();
}
