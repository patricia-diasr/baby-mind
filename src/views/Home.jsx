import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CardNewItem,
  CustomList,
  BabyCard,
} from "../components";
import { list } from "../services/supabasedb";
import { useAppContext } from "../Context";

const Home = () => {
  const [data, setData] = useState([]);
  const [babyData, setBabyData] = useState(null);
  const { translate } = useAppContext();

  useEffect(() => {
    async function fetchData() {
      const d = await list("action");
      const profile = JSON.parse(localStorage.getItem("profile"));

      if (d) {
        setData(d);
      }

      if (profile) {
        setBabyData(profile);
      }
    }

    fetchData();
  }, []);

  const ACTIONS = [
    {
      title: "sleep",
      actionType: 1,
      icon: "crib_1725450.png",
    },
    {
      title: "eat",
      actionType: 2,
      icon: "feeder_1725449.png",
    },
    {
      title: "diaper",
      actionType: 3,
      icon: "diaper_1725454.png",
    },
  ];

  return (
    <Container maxWidth="md">
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <BabyCard data={babyData} />
      </Container>
      <Typography sx={{ marginTop: "32px" }} variant="h5" gutterBottom>
        {translate("cad-activitys")}
      </Typography>
      <Container
        sx={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {ACTIONS.map((action, index) => (
          <CardNewItem
            title={action.title}
            icon={action.icon}
            actionType={action.actionType}
            key={index}
          />
        ))}
      </Container>
      <Typography sx={{ marginTop: "32px" }} variant="h5" gutterBottom>
        {translate("activity")}
      </Typography>
      {data ? <CustomList items={data} /> : null}
    </Container>
  );
};

export default Home;
