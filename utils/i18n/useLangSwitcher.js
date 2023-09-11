import { lazy } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'


import dataUa from "../../data/dataUa.json";
import dataEn from "../../data/dataEn.json";
import dataDe from "../../data/dataDe.json";
import dataPl from "../../data/dataPl.json";
import dataSk from '../../data/dataSk.json'
import dataRu from '../../data/dataRu.json'
import dataIt from '../../data/dataIt.json'
import dataHu from '../../data/dataHu.json'
import dataCs from '../../data/dataCs.json'

function useLangSwitcher() {
  const router = useRouter();
  const { locale } = router;

  const data =
    locale == "ua"
      ? dataUa
      : locale == "de"
      ? dataDe
      : locale == "pl"
      ? dataPl
      : locale == "en"
      ? dataEn
      : locale == "sk"
      ? dataSk
      : locale == "it"
      ? dataIt
      : locale == "hu"
      ? dataHu
      : locale == "cs"
      ? dataCs
      : locale == "ru"
      ? dataRu
      : dataUa;

  return { data };
}

export default useLangSwitcher;
