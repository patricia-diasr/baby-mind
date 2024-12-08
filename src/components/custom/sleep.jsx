import { useEffect } from "react";
import { DateTimePicker, Box, TextField } from "..";
import { handleInputChange } from "../../utils/action";
import { adjustDateTimeForTimezone } from "../../utils/core";

const Sleep = ({ data, setData, translate }) => {
  useEffect(() => {
    setData({ ...data, action_type: 1 });
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
        value={
          data?.start_date ? adjustDateTimeForTimezone(data?.start_date) : null
        }
        style={styles.dateTimePicker}
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
      <DateTimePicker
        value={
          data?.end_date ? adjustDateTimeForTimezone(data?.end_date) : null
        }
        style={styles.dateTimePicker}
        label={translate("data-hour-end")}
        name="end_date"
        fullWidth={true}
        ampm={false}
        format="DD/MM/YYYY HH:mm"
        onChange={(value) => {
          handleInputChange(
            "end_date",
            new Date(value.toString()),
            data,
            setData
          );
        }}
      />
      <TextField
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

export default Sleep;
