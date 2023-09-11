// @ts-nocheck
import Fake from "./Fake";
import useLangSwitcher from "../../../utils/i18n/useLangSwitcher";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import getMediaData from "../../../lib/getMediaData";

const FakeList = ({
  narrative,
  month,
  year,
  tagName,
}: {
  narrative?: string;
  month?: string;
  year?: string;
  tagName?: string;
}) => {
  const { data } = useLangSwitcher();

  const router = useRouter();
  const { locale } = router;

  const [dataFakes, setDataFakes] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://vox-dashboard.ra-devs.tech/api/sub-narratives?lang=${locale}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDataFakes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [locale]);

  const fakeFiltered = useMemo(
    () =>
      // @ts-ignore
      data.filter(
        (item: { Narrative: string | undefined }) =>
          item.Narrative === narrative
      ),
    [data, narrative]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // @ts-ignore
  const fakeByTag = useMemo(
    () =>
      data.filter(
        // @ts-ignore
        (item) => item.Tag === tagName || item.Tag.split(", ").includes(tagName)
      ),
    [data, tagName]
  );

  const uniqueFakesEn: string[] = [];
  // @ts-ignore
  fakeFiltered.map((c) => {
    if (!uniqueFakesEn.includes(c.Fake)) {
      uniqueFakesEn.push(c.Fake);
    }
    return c;
  });
  const renderedFakes =
    dataFakes &&
    // @ts-ignore
    dataFakes.data.map((item) => {
      if (item.narrative_id == narrative) {
        return (
          <Fake
            fake={item.title}
            fakeId={item.id}
            narrativeId={item.narrative_id}
            key={item.id}
          />
        );
      }
    });

  const uniqueFakesByTagEn: string[] = [];
  fakeByTag.map((c: { Fake: string }) => {
    if (!uniqueFakesByTagEn.includes(c.Fake)) {
      uniqueFakesByTagEn.push(c.Fake);
    }
    return c;
  });
  const renderedFakesByTag = uniqueFakesByTagEn.map((item) => (
    <Fake fake={item} key={item} />
  ));

  const uniqueFakesByDate: string[] = [];
  // @ts-ignore
  data.map((c) => {
    if (
      !uniqueFakesByDate.includes(c.Fake) &&
      c.Date > `${year}-${month}-01` &&
      c.Date < `${year}-${month}-31`
    ) {
      uniqueFakesByDate.push(c.Fake);
    }
    return c;
  });

  const renderedFakesByMonth = uniqueFakesByDate.map((item) => (
    <Fake fake={item} key={item} month={month} year={year} />
  ));

  return (
    <>
      {/* {tagName
        ? renderedFakesByTag
        : month
        ? renderedFakesByMonth
        : renderedFakes}*/}
      {renderedFakes}
    </>
  );
};

export default FakeList;
