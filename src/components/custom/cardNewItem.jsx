import React from "react";
import { Card, Typography, Box } from "..";
import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context";

const CardNewItem = ({ title, icon, actionType }) => {
  const navigate = useNavigate();
  const { translate } = useAppContext();

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        boxShadow: 3,
        width: 200,
        cursor: "pointer",
      }}
      onClick={() => navigate(`/new/${actionType}`)}
    >
      <CardMedia
        component="img"
        image={icon}
        alt={`Ícone de ${title}`}
        sx={{ width: 60, height: 60, marginRight: 2 }}
      />
      <Box>
        <Typography variant="h6" component="div" gutterBottom>
          {translate(title)}
        </Typography>
      </Box>
    </Card>
  );
};

export default CardNewItem;
