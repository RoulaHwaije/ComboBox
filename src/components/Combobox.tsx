import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";
import {
  ListItemText,
  List,
  Popper,
  Paper,
  CircularProgress,
} from "@mui/material";

interface ComboProps {
  itemsArray?: string[];
  open: boolean;
  setOpenCombo: (item: boolean) => void;
  anchorElement?: HTMLElement | null;
  setselectedUniversity: (item: string) => void;
  selectedUniversity: string;
  loading?: boolean;
  InputTyping: boolean;
  setInputTyping: (item: boolean) => void;
}

const CustomList = styled(Paper)({
  width: "23.3rem",
  border: "3px solid #b9b8b8",
});

const CustomListItem = styled("div")({
  padding: "8px 16px",
  width: "20rem",
  textAlign: "center",
  borderBottom: "3px solid #b9b8b8",
  cursor: "pointer",
  "&:hover": {
    background: "#f5f5f5",
  },
});

const ComboBox: React.FC<ComboProps> = ({
  open,
  itemsArray,
  anchorElement,
  setOpenCombo,
  setselectedUniversity,
  loading,
  setInputTyping,
}) => {
  const popperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node) &&
        anchorElement &&
        !anchorElement.contains(event.target as Node)
      ) {
        setOpenCombo(false);
        setInputTyping(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, anchorElement, setOpenCombo, setInputTyping]);

  function onItemClick(item: string): void {
    setselectedUniversity(item);
    setInputTyping(false);
    setOpenCombo(false);
  }
  return (
    <Popper
      open={anchorElement != null && open}
      anchorEl={anchorElement}
      placement="bottom"
    >
      <Paper style={{ maxHeight: 200, overflowY: "auto" }}>
        <CustomList ref={popperRef}>
          {loading ? (
            <CircularProgress />
          ) : (
            <List>
              {itemsArray &&
                itemsArray.map((item, index) => (
                  <CustomListItem key={index} onClick={() => onItemClick(item)}>
                    <ListItemText
                      primary={
                        <span
                          style={{
                            color: "#575454",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            display: "block",
                          }}
                        >
                          {item}
                        </span>
                      }
                    />
                  </CustomListItem>
                ))}
            </List>
          )}
        </CustomList>
      </Paper>
    </Popper>
  );
};

export default ComboBox;
