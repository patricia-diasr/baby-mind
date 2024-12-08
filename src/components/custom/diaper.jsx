import { useEffect } from "react";
import { Button, DateTimePicker, Box, TextField } from "..";
import { handleInputChange, selectItem } from "../../utils/action";
import { adjustDateTimeForTimezone } from "../../utils/core";

const Diaper = ({ data, setData, translate }) => {
  useEffect(() => {
    setData({ ...data, action_type: 3 });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: { xs: "100%", md: "600px" },
      }}
    >
      <DateTimePicker
        style={styles.dateTimePicker}
        value={
          data?.start_date ? adjustDateTimeForTimezone(data?.start_date) : null
        }
        label={translate("data-hour-start")}
        name="start_date"
        fullWidth={true}
        ampm={false}
        format="DD/MM/YYYY HH:mm"
        onChange={(value) => {
          handleInputChange(
            "start_date",
            new Date(value.toString()),
            data,
            setData
          );
        }}
      />
      <Box style={styles.buttonGroup}>
        <Button
          style={styles.button}
          color={data.type === 1 ? "secondary" : "primary"}
          onClick={() => {
            selectItem(1, "type", data, setData);
          }}
        >
          {translate("diaper-wet")}
        </Button>
        <Button
          style={styles.button}
          color={data.type === 2 ? "secondary" : "primary"}
          onClick={() => {
            selectItem(2, "type", data, setData);
          }}
        >
          {translate("diaper-dirty")}
        </Button>
        <Button
          style={styles.button}
          color={data.type === 3 ? "secondary" : "primary"}
          onClick={() => {
            selectItem(3, "type", data, setData);
          }}
        >
          {translate("diaper-both")}
        </Button>
        <Button
          style={styles.button}
          color={data.type === 4 ? "secondary" : "primary"}
          onClick={() => {
            selectItem(4, "type", data, setData);
          }}
        >
          {translate("diaper-clean")}
        </Button>
      </Box>
      <TextField
        style={styles.textField}
        value={data?.observation ? data.observation : ""}
        label={translate("observation")}
        onChange={(event) => {
          handleInputChange("observation", event.target.value, data, setData);
        }}
        name="observation"
        rows={6}
        fullWidth={true}
        multiline={true}
      />
    </Box>
  );
};

const styles = {
  dateTimePicker: {
    width: "100%",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
  },
  button: {
    width: "280px",
    minWidth: "280px",
  },
  textField: {
    width: "100%",
  },
};

export default Diaper;
