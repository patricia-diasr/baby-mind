import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../Context.jsx";
import { Box, Button, Diaper, Eat, Sleep, AppBar } from "../components";
import { useEffect, useState } from "react";
import { drop, get, save, update } from "../services/supabasedb";
import { getTitle, validateFields } from "../utils/action";
import { getUser } from "../utils/core";

const Form = () => {
  const { translate, showAlertMessage } = useAppContext();
  const navigate = useNavigate();

  const params = useParams();
  const actionType = params.type;
  const id = params.id;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getForm = (actionType) => {
    switch (actionType) {
      case "1":
        return <Sleep data={data} setData={setData} translate={translate} />;

      case "2":
        return <Eat data={data} setData={setData} translate={translate} />;

      case "3":
        return <Diaper data={data} setData={setData} translate={translate} />;

      default:
        return <Eat data={data} setData={setData} translate={translate} />;
    }
  };

  const loadData = async (id) => {
    if (id) {
      const result = await get("action", [
        { field: "id", value: id },
        { field: "user_id", value: getUser().id },
      ]);
      setData(result);
    }
  };

  useEffect(() => {
    if (params && params.id) {
      loadData(params.id);
    }
  }, []);

  return (
    <>
      <AppBar
        title={translate(getTitle(actionType))}
        id={id}
        _delete={() => {
          const _confirm = confirm(translate("delete-confirm"));
          if (_confirm) {
            drop(id);
            showAlertMessage(translate("delete-message"), "success");
            setTimeout(() => {
              navigate("/");
            }, 3000);
          } else {
            showAlertMessage(translate("cancel-message"), "error");
          }
        }}
      />
      <Box style={styles.container}>
        <Box>
          {getForm(actionType)}
          <Button
            style={{ ...styles.button, ...(loading && styles.buttonLoading) }}
            disabled={loading}
            onClick={async () => {
              try {
                const fields = validateFields(data, actionType);
                if (fields.length === 0) {
                  if (id) {
                    await update("action", data, id);
                  } else {
                    data.user_id = getUser().id;
                    await save("action", data);
                  }
                  showAlertMessage(
                    id
                      ? translate("edit-message")
                      : translate("create-message"),
                    "success"
                  );
                  setTimeout(() => {
                    navigate("/");
                  }, 3000);
                } else {
                  showAlertMessage(fields.map(translate).join(" "), "warning");
                }
              } catch (err) {
                showAlertMessage(
                  id ? translate("error-edit") : translate("error-create"),
                  "error"
                );
              }
            }}
          >
            {translate("save")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

const styles = {
  container: {
    paddingTop: "32px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: "16px",
  },
  buttonLoading: {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  },
};

export default Form;
