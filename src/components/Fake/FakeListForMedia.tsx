// @ts-nocheck

import ListOfMediaFiltered from "../SubNarratives/ListOfMediaFiltered";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import getSubNarrativeData from "../../../lib/getSubNarrativeData";

const FakeListForMedia = ({
  narrativeId,
  country,
  media,
}: {
  narrativeId?: string;
  narrative?: string;
  country?: string;
  media?: string;
}) => {
  const [subNarrativeData, setSubNarrativeData] = useState(null);

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    let isMounted = true;

    async function getSubNarrative() {
      // @ts-ignore
      const dataFetched = await getSubNarrativeData(locale);
      if (isMounted) {
        setSubNarrativeData(dataFetched);
      }
    }
    getSubNarrative();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  // subNarrativeTitle,
  // subNarrativeId,
  // narrativeId,
  // country,
  // media,

  const renderedFakesByMedia =
    subNarrativeData &&
    subNarrativeData.data.map((item) => {
      if (item.narrative_id == narrativeId) {
        return (
          <div key={item.id}>
            <ListOfMediaFiltered
              subNarrativeTitle={item.title}
              subNarrativeId={item.id}
              narrativeId={narrativeId}
              country={country}
              media={media}
            />
          </div>
        );
      }

      // return <Media key={i} fake={fake} country={country} media={media} />;
    });

  return <div>{renderedFakesByMedia}</div>;
};

export default FakeListForMedia;
