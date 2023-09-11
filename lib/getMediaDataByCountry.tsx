// @ts-nocheck
export default async function getMediaDataByCountry(
  locale: string,
  country?: number,
  media_name?: string
) {
  const isMedia = media_name == "all" ? "" : "&media_name=" + `${media_name}`;
  const isCountry = country == "all" ? "" : "&country=" + country;

  const res = await fetch(
    `https://vox-dashboard.ra-devs.tech/api/dashboards?lang=${locale}${isCountry}${isMedia}`
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
//     'search'=>['string'] const monthPlaceholder = month !== 0 ? "&month=" + month : "";
