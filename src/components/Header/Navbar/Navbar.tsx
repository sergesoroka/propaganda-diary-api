import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../Header.module.css";
import SearchIcon from "@/components/Icons/SearchIcon";
import SpetialText from "../../../../data/SpetialText";

const Navbar = () => {
  const router = useRouter();
  const { pathname, locale } = router;
  const dataLink =
    locale == "ua"
      ? "https://docs.google.com/spreadsheets/d/19X7jGy-_cvuenGCfW9Xhw7F8KqKKBLvqJaMLxtcB3Fk/edit?usp=sharing"
      : locale == "de"
      ? "https://docs.google.com/spreadsheets/d/1dpUJ6X7iCRCeQs0Nj7J637-SZzfxxIduAal50Lm8Kmk/edit?usp=sharing"
      : locale == "pl"
      ? "https://docs.google.com/spreadsheets/d/1s5QNPU0dF8KmCqX4pEzv32AvtZCaxvNJWqGXuxe-OSk/edit?usp=sharing"
      : locale == "en"
      ? "https://docs.google.com/spreadsheets/d/18vcqEmy-Cra6NwM5vj5SWkwJD4uDVr-BU9EiXwlWCgk/edit?usp=sharing"
      : locale == "sk"
      ? "https://docs.google.com/spreadsheets/d/1lINBoq9tXnAAiIJC1jT_ohyH7cw16Ii-aD_Bgs-I6as/edit?usp=sharing"
      : locale == "it"
      ? "https://docs.google.com/spreadsheets/d/144RiYFiEdma9RIAaamUPrrAkKFdw41JY7MZgH6_4BMU/edit?usp=sharing"
      : locale == "hu"
      ? "https://docs.google.com/spreadsheets/d/1h4CF6Epe4i6QJOcihFCS31RAz0jN8VcKtnETII-pGSg/edit?usp=sharing"
      : locale == "cs"
      ? "https://docs.google.com/spreadsheets/d/1OXgd7m8Ekvl7yaT612ioQ5zNjpDZFLD9zZyltZMthrY/edit?usp=sharing"
      : locale == "ru"
      ? "https://docs.google.com/spreadsheets/d/1CFmpaHrg5heIpzPoAbQRhy60d0g6424WyDvgbvfixog/edit?usp=sharing"
      : "https://docs.google.com/spreadsheets/d/18vcqEmy-Cra6NwM5vj5SWkwJD4uDVr-BU9EiXwlWCgk/edit?usp=sharing";

  return (
    <ul className={styles.navbarWrap}>
      <Link href="/narratives">
        <li className={pathname === "/narratives" ? styles.activeLink : ""}>
          <SpetialText name={"All_narratives"} />
        </li>
      </Link>
      <Link href="/about">
        <li className={pathname === "/about" ? styles.activeLink : ""}>
          <SpetialText name={"About"} />
        </li>
      </Link>
      <Link href="/lists">
        <li className={pathname === "/lists" ? styles.activeLink : ""}>
          <SpetialText name={"Lists"} />
        </li>
      </Link>
      <Link href="/media">
        <li className={pathname === "/media" ? styles.activeLink : ""}>
          <SpetialText name={"Media"} />
        </li>
      </Link>
      <Link href="/reports">
        <li className={pathname === "/reports" ? styles.activeLink : ""}>
          <SpetialText name={"Reports"} />
        </li>
      </Link>

      <Link href={dataLink} target="_blank">
        <li>
          <SpetialText name={"Download"} />
        </li>
      </Link>
      <Link href="/archive">
        <li className={pathname === "/archive" ? styles.activeLink : ""}>
          <SpetialText name={"Archive"} />
        </li>
      </Link>
      <Link href="/search">
        <li style={{ marginTop: "4px" }}>
          <SearchIcon />
        </li>
      </Link>
    </ul>
  );
};

export default Navbar;
