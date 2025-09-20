import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = React.useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity); // will call api here
      onActivityAdded();
      setActivity({ type: "RUNNING", duration: "", caloriesBurned: "" });
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Activity Type</InputLabel>
        <Select
          value={activity.type}
          onChange={(e) => setActivity({ ...activity, type: e.target.value })}
        >
          <MenuItem value="RUNNING">Running</MenuItem>
          <MenuItem value="WALKING">Walking</MenuItem>
          <MenuItem value="CYCLING">Cycling</MenuItem>
          <MenuItem value="SWIMMING">Swimming</MenuItem>
          <MenuItem value="WEIGHT_TRAINING">Weight Training</MenuItem>
          <MenuItem value="YOGA">Yoga</MenuItem>
          <MenuItem value="HIIT">HIIT</MenuItem>
          <MenuItem value="CARDIO">Cardio</MenuItem>
          <MenuItem value="STRETCHING">Stretching</MenuItem>
          <MenuItem value="OTHER">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Duration (minutes)"
        type="number"
        sx={{ mb: 2 }}
        value={activity.duration}
        onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
      />

      <TextField
        fullWidth
        label="Calories Burned"
        type="number"
        sx={{ mb: 2 }}
        value={activity.caloriesBurned}
        onChange={(e) =>
          setActivity({ ...activity, caloriesBurned: e.target.value })
        }
      />

      <Button type="submit" variant="contained">
        Add Activity
      </Button>
    </Box>
  );
};

export default ActivityForm;
