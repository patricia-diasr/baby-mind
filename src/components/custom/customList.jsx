import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Avatar } from "..";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context";
import { formatDate } from "../../utils/core";

const CustomList = ({ items, ...props }) => {
  const navigate = useNavigate();
  const { translate } = useAppContext();

  const getImage = (typeAction) => {
    switch (typeAction) {
      case 1:
        return "crib_1725450.png";
      case 2:
        return "feeder_1725449.png";
      case 3:
        return "diaper_1725454.png";
      default:
        return "feeder_1725449.png";
    }
  };

  const actionTypeListToInt = {
    1: "sleep",
    2: "eat",
    3: "diaper",
  };

  return (
    <List
      {...props}
      sx={{
        padding: 0,
        marginTop: 2,
        backgroundColor: "#fafafa",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {items.map((item, index) => {
        const typeStr = actionTypeListToInt[item.action_type];
        return (
          <ListItem
            key={index}
            id={`new-item-list-${index}`}
            onClick={() => navigate(`/${item.action_type}/${item.id}`)}
            sx={{
              borderBottom: "1px solid #ddd",
              paddingY: 2,
              "&:hover": {
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={getImage(item.action_type)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#e0e0e0",
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={translate(typeStr)}
              secondary={formatDate(item.start_date)}
              sx={{
                fontSize: "1.1rem",
                fontWeight: 500,
                color: "#333",
                lineHeight: 1.5,
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default CustomList;
