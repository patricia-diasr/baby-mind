import { useEffect } from "react";
import { Button, DateTimePicker, Box, TextField } from "..";
import { handleInputChange, selectItem } from "../../utils/action";
import { adjustDateTimeForTimezone } from "../../utils/core";

const Eat = ({ data, setData, translate }) => {
  useEffect(() => {
    setData({ ...data, action_type: 2 });
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
      <Box style={styles.buttonGroup}>
        <Button
          style={styles.button}
          color={data.type === 1 ? "secondary" : "primary"}
          onClick={() => {
            handleInputChange("side", null, data, setData);
            handleInputChange("end_date", null, data, setData);
            selectItem(1, "type", data, setData);
          }}
        >
          {translate("eat-bottle")}
        </Button>
        <Button
          color={data.type === 2 ? "secondary" : "primary"}
          style={styles.button}
          onClick={() => {
            handleInputChange("quantity", null, data, setData);
            selectItem(2, "type", data, setData);
          }}
        >
          {translate("eat-bosom")}
        </Button>
      </Box>
      <DateTimePicker
        value={
          data?.start_date ? adjustDateTimeForTimezone(data?.start_date) : null
        }
        label={
          data.type === 1
            ? translate("data-hour")
            : translate("data-hour-start")
        }
        style={styles.dateTimePicker}
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
      {data.type === 2 ? (
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
      ) : null}
      {data.type === 1 ? (
        <TextField
          value={data?.quantity ? data.quantity : ""}
          label={translate("quantity") + " (ml)"}
          onChange={(event) => {
            handleInputChange("quantity", event.target.value, data, setData);
          }}
          name="quantity"
          type={"number"}
          fullWidth={true}
        />
      ) : (
        <Box style={styles.buttonGroup}>
          <Button
            style={styles.button}
            color={data.side === 1 ? "secondary" : "primary"}
            onClick={() => {
              selectItem(1, "side", data, setData);
            }}
          >
            {translate("left")}
          </Button>
          <Button
            style={styles.button}
            color={data.side === 2 ? "secondary" : "primary"}
            onClick={() => {
              selectItem(2, "side", data, setData);
            }}
          >
            {translate("right")}
          </Button>
          <Button
            style={styles.button}
            color={data.side === 3 ? "secondary" : "primary"}
            onClick={() => {
              selectItem(3, "side", data, setData);
            }}
          >
            {translate("both")}
          </Button>
        </Box>
      )}
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

export default Eat;
