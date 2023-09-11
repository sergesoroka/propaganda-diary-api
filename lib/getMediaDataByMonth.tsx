export default async function getMediaDataByMonth(
  locale: string,
  month?: string,
  year?: number,
  country?: number
) {
  const res = await fetch(
    `https://vox-dashboard.ra-devs.tech/api/dashboards?lang=${locale}&month=${month}&year=${year}&country=${country}`
  );
  if (!res.ok) throw new Error("Fail to fetch data");
  return res.json();
}

// 'lang' =>['string'],
//     'per_page'=>['int'],
//     "year" => ['int'],
//     "month" => ['string'],
//     'media_name'=>['string'],
//     'country'=>['string'],
//     'narrative_id'=> ['int'],
//     'sub_narrative_id'=> ['int'],
//     'search'=>['string']
