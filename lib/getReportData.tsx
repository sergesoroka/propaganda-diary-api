// @ts-nocheck
export default async function getReportData(locale) {
  const res = await fetch(
    `https://vox-dashboard.ra-devs.tech/api/pages?lang=${locale}`
  );
  if (!res.ok) throw new Error("Fail to fetch data");
  return res.json();
}
