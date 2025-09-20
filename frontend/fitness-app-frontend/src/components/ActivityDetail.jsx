import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivityDetail } from "../services/api";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchActivity();
  }, [id]);

  console.log(activity);

  if (activity) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Activity Details
            </Typography>
            <Typography>Type: {activity.activityType}</Typography>
            <Typography>Duration: {activity.duration} minutes</Typography>
            <Typography>Calories Burned: {activity.caloriesBurned}</Typography>
            <Typography>
              Date: {new Date(activity.createdAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        {recommendation && (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                AI Recommendation
              </Typography>
              <Typography variant="h6">Analysis</Typography>
              <Typography paragraph>{activity.recommendation}</Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">Improvements</Typography>
              {activity?.improvements?.map((improvement, index) => (
                <Typography key={index} paragraph>
                  • {improvement}
                </Typography>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">Suggestions</Typography>
              {activity?.suggestions?.map((suggestion, index) => (
                <Typography key={index} paragraph>
                  • {suggestion}
                </Typography>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">Safety Guidelines</Typography>
              {activity?.safety?.map((safety, index) => (
                <Typography key={index} paragraph>
                  • {safety}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}
      </Box>
    );
  }

  if (!activity) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
        <Typography>Loading activity details...</Typography>
      </Box>
    );
  }
};

export default ActivityDetail;
