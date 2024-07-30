import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PropTypes from "prop-types";
import { useState } from "react";
import Contet from "./Contet";
import FormAdd from "../docs/FormAdd";
import { Link } from "react-router-dom";

const AvatarUser = ({ userAccess }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} sm={6} lg={4} xl={4}>
        <Box>
          <List
            sx={{
              width: "100%",
              maxWidth: "100%",
              minWidth: 150,
              bgcolor: "#9873",
              position: "sticky",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                {userAccess.photoURL ? (
                  <Avatar
                    alt="Remy Sharp"
                    src={userAccess && userAccess.photoURL}
                  />
                ) : (
                  <Avatar src="/broken-image.jpg" />
                )}
              </ListItemIcon>
              <ListItemText
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                primary={
                  (userAccess && userAccess.displayName) || userAccess.email
                }
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ContactMailIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    primary={userAccess && userAccess.email}
                  />
                </ListItemButton>
                <ListItemText
                  sx={{
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Button variant="contained" color="secondary">
                    <Link
                      to="/general"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Task General
                    </Link>
                  </Button>
                </ListItemText>
              </List>
            </Collapse>
          </List>
        </Box>
        <Divider />
        <FormAdd />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={8} xl={8}>
        <Contet />
      </Grid>
    </Grid>
  );
};

export default AvatarUser;

AvatarUser.propTypes = {
  userAccess: PropTypes.object,
};
