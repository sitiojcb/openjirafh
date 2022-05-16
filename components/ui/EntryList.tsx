import { DragEvent, FC, useContext, useMemo } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { List, Paper } from "@mui/material";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";

import styles from "./EntryList.module.css";
interface Props {
  status: EntryStatus;
}
export const EntryList: FC<Props> = ({ status }) => {
  //console.log({ status });
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );
  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };
  const onDropEntry = (event: DragEvent) => {
    event.preventDefault();
    const elId = event.dataTransfer.getData("texto");
    //console.log(elId);
    const elEntry = entries.find((e) => e._id === elId)!;
    elEntry.status = status;
    updateEntry(elEntry);
    endDragging();
  };
  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.moviendo : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overFlow: "scroll",
          backgroundColor: "transparent",
          padding: "4px 6px",
        }}
      >
        {/* //la opacidad cambia al hacer drag */}
        <List sx={{ opacity: isDragging ? 0.6 : 1, transition: "all .5s " }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
