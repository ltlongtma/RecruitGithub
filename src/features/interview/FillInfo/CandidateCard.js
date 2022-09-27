import React from "react";
import className from "classnames/bind";
import style from "./module.scss";
import { Card, CardActionArea, CardContent, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

const cx = className.bind(style);

export const CandidateCard = ({
  hiddenCardOptions,
  handleNewCandidate,
  handlePendingCandidate,
}) => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: "60px",
  }));
  return (
    <div className={cx("cardContainer")} hidden={hiddenCardOptions}>
      <div onClick={handleNewCandidate}>
        <Card className={cx("cardNew")}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5">
                <AddIcon fontSize="large" color="success" />
                New Candidate
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div onClick={handlePendingCandidate}>
        <Card className={cx("cardPending")}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <PeopleIcon fontSize="large" color="error" sx={{ mr: 1 }} />
                Pending Candidate
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};
