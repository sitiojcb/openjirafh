import { DragEvent, FC, useContext } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui";
import { dateFunctions } from "../../utils";

interface Props {
  entry: Entry;
  // color: string;
}
export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();
  let color: string;
  // if (entry.status === "pending") {
  //   color = "orange";
  // }
  // if (entry.status === "finished") {
  //   color = "#0000FF";
  // }
  switch (entry.status) {
    case "pending":
      color = "#d94e18";
      break;
    case "in-progress":
      color = "#525189";
      break;
    case "finished":
      color = "#0000FF";
      break;
    default:
      color = "#444";
  }
  //para el drag DragEvent<HTMLDivElement>
  const onDragStart = (event: DragEvent) => {
    console.log(event.dataTransfer);
    //modificar el estado indicando el drag
    event.dataTransfer.setData("texto", entry._id);
    startDragging();
  };
  const onDragEnd = () => {
    //fin del drag
    endDragging();
    //comenta podriamos pasarlo directamente en el <Card onDragEnd
  };
  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      sx={{ marginBottom: "10px", backgroundColor: color }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
