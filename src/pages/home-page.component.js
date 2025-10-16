import React, { useState, useEffect } from "react";
import classes from "./home-page.styles.module.css";
import premImage from "./images/leagues/premierLegue/prem-logo.png";
import laLigaImage from "./images/leagues/laLiga/LaLiga_logo.png";
import serieAimage from "./images/leagues/serieA/serie-a-logo.png";
import ligue1image from "./images/leagues/ligue1/Ligue1_logo.png";
import bundesligaImage from "./images/leagues/Bundesliga/bundesliga-logo.png";

function MultiListWithSubLinks() {
  const [apiList, setApiList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSubLink, setActiveSubLink] = useState(null);

  const leagues = [
    {
      title: "English Premier League",
      images: premImage,
      urls: ["/leagueData.json", "/leagueFixtures.json"],
    },
    {
      title: "La Liga",
      images: laLigaImage,
      urls: ["/laLigaData.json", "/laLigaFix.json"],
    },
    {
      title: "Serie A",
      images: serieAimage,
      urls: ["/serieAData.json", "/serieAFix.json"],
    },
    {
      title: "Ligue 1",
      images: ligue1image,
      urls: ["/ligue1Data.json", "ligue1Fix.json"],
    },
    {
      title: "Bundesliga",
      images: bundesligaImage,
      urls: ["bundesligaData.json", "bundesligaFix.json"],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leagueData = await Promise.all(
          leagues.map(async (league) => {
            // If no valid URLs → return empty placeholders
            if (!league.urls || league.urls.length < 2 || !league.urls[0]) {
              return {
                title: league.title,
                images: league.images,
                subLinks: [
                  { label: "Fixtures", data: null },
                  { label: "League Table", data: null },
                ],
              };
            }

            // Fetch both JSON files
            const responses = await Promise.all(
              league.urls.map((u) => fetch(u))
            );
            responses.forEach((res) => {
              if (!res.ok) throw new Error(`Failed to fetch ${res.url}`);
            });

            const [tableData, fixtureData] = await Promise.all(
              responses.map((res) => res.json())
            );

            return {
              title: league.title,
              images: league.images,
              subLinks: [
                { label: "Fixtures", data: fixtureData },
                { label: "League Table", data: tableData },
              ],
            };
          })
        );

        setApiList(leagueData);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
    setActiveSubLink(null);
  };

  const handleSubLinkClick = (label) => {
    setActiveSubLink((prev) => (prev === label ? null : label));
  };

  //parsing of JSON structures
  const renderTable = (link) => {
    if (!link?.data) return <p>No data available</p>;

    if (link.label === "Fixtures") {
      const fixtures =
        link.data[0]?.Football?.["Premier League"] ||
        link.data[0]?.Football?.["La Liga"] ||
        link.data[0]?.Football?.["Serie A"] ||
        link.data[0]?.Football?.["Ligue 1"] ||
        link.data[0]?.Football?.["Bundesliga"] ||
        [];
      if (!fixtures.length) return <p>No fixtures found</p>;

      return (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Match</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {fixtures.map((fixture, i) => (
              <tr key={i}>
                <td>{fixture.match}</td>
                <td>{fixture.score}</td>
                <td>{fixture.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (link.label === "League Table") {
      const teams = Object.values(link.data.original || {});
      if (!teams.length) return <p>No table data found</p>;
      const sortedTeams = teams
        .filter((team) => team.points !== undefined)
        .sort((a, b) => b.points - a.points);

      return (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Position</th>
              <th>Team</th>
              <th>Played</th>
              <th>Won</th>
              <th>Drawn</th>
              <th>Lost</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, i) => (
              <tr key={team.clubA || i}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={team.logo}
                    alt={team.clubA}
                    style={{ width: "20px", verticalAlign: "middle" }}
                  />{" "}
                  {team.clubA}
                </td>
                <td>{team.played}</td>
                <td>{team.won}</td>
                <td>{team.drawn}</td>
                <td>{team.lost}</td>
                <td>{team.gf}</td>
                <td>{team.ga}</td>
                <td>{team.gd}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return <pre>{JSON.stringify(link.data, null, 2)}</pre>;
  };

  // pick active link data
  const selectedLeague = apiList[activeIndex];
  const selectedLink =
    selectedLeague?.subLinks.find((l) => l.label === activeSubLink) || null;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* LEFT: League list */}
      <ul className={classes["homepage-ul"]} style={{ flex: 1 }}>
        {apiList.length > 0 ? (
          apiList.map((item, index) => (
            <li key={index} className={classes["homepage-li"]}>
              <div
                onClick={() => handleClick(index)}
                style={{
                  height: "100px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {item.images && (
                  <img
                    src={item.images}
                    alt={item.title + " logo"}
                    style={{
                      objectFit: "contain",
                      height: "80px",
                      width: "40px",
                      verticalAlign: "middle",
                    }}
                  />
                )}
                <span>{item.title}</span>
              </div>

              {/* ✅ Sub-links nested properly */}
              {activeIndex === index && (
                <ul className={classes["sub-links-list"]}>
                  {item.subLinks.map((link, subIndex) => (
                    <li
                      key={subIndex}
                      className={classes["sub-link"]}
                      onClick={() => handleSubLinkClick(link.label)}
                    >
                      <span>{link.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>

      {/* RIGHT: Rendered Data */}
      <div style={{ flex: 2 }}>
        {selectedLink ? (
          renderTable(selectedLink)
        ) : (
          <p className={classes["para-header"]}>Select a league & view data</p>
        )}
      </div>
    </div>
  );
}

export default MultiListWithSubLinks;
