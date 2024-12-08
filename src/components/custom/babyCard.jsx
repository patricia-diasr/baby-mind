import React from "react";
import { Card, Typography, Box } from "..";
import { useAppContext } from "../../Context";

const BabyCard = ({ data }) => {
  const { translate } = useAppContext();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  if (!data) {
    return;
  }

  return (
    <Card
      sx={{
        width: "300px",
        borderRadius: "8px",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        backgroundColor: "primary.light",
      }}
    >
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {data.name || translate("your-baby")}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          <strong>{translate("weight")}:</strong> {data.weight || 0} kg
        </Typography>
        <Typography variant="body1">
          <strong>{translate("height")}:</strong> {data.height || 0} cm
        </Typography>
        <Typography variant="body1">
          <strong>{translate("birth-date")}: </strong>
          {data.birth ? formatDate(data.birth) : ""}
        </Typography>
      </Box>
    </Card>
  );
};

export default BabyCard;
