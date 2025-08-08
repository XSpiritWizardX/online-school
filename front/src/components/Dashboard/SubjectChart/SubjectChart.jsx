import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

const data = [
  { subject: "Math", score: 85 },
  { subject: "Science", score: 92 },
  { subject: "Reading", score: 78 },
  { subject: "Writing", score: 74 },
  { subject: "Art", score: 91 },
  { subject: "Music", score: 88 },
  { subject: "Social Studies", score: 80 },
  { subject: "Health", score: 80 },
  { subject: "Computer Science", score: 95 },
  { subject: "Language Arts", score: 76 }
];

export const SubjectChart = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={75} domain={[0, 100]} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#fffb00ff"
            fill="#0d972bff"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
