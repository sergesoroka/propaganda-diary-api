// @ts-nocheck
// country, media, narrative_id, sub_narrative_id
export default async function getMediaDataByCountryByMedia(
  locale: string,
  country?: number,
  media_name?: string,
  narrative_id?: string,
  sub_narrative_id?: string
) {
  const isMedia = media_name == "all" ? "" : "&media_name=" + `${media_name}`;
  const isCountry = country == "all" ? "" : "&country=" + country;

  const res = await fetch(
    `https://vox-dashboard.ra-devs.tech/api/dashboards?lang=${locale}${isCountry}${isMedia}&narrative_id=${narrative_id}&sub_narrative_id=${sub_narrative_id}`
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
