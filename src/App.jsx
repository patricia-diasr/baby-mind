import AppProvider from "./Context.jsx";
import Routes from "./routes/index.jsx";

const App= () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
