import { useRouter } from "next/router";
import BarChart from "./BarChart";
import BarChartCurrent from "./BarChartCurrent";

export default function Timeline({
  current,
  setMedia,
}: {
  current: string;
  setMedia?: (media: string) => {};
}) {
  const router = useRouter();
  const { year } = router.query;

  const placeholder =
    router.pathname == "/" || router.pathname == "/archive" ? current : year;

  return (
    <>
      <div>
        {placeholder === "2022" && <BarChart current={current} />}
        {placeholder === "2023" && <BarChartCurrent current={current} />}
      </div>
    </>
  );
}
