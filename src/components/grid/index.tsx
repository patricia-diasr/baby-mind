import { Grid, GridProps } from "@mui/material";

interface IGridProps extends GridProps {
  children?: React.ReactNode;
  props: any;
}

const GridComponent: React.FC<IGridProps> = ({ children, ...props }) => {
  return <Grid {...props}>{children}</Grid>;
};

export default GridComponent;
