"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  students: { label: "Students" },
  First: { label: "First", color: "#2662D9" },
  Second: { label: "Second", color: "#E23670" },
  Third: { label: "Third", color: "#E88C30" },
  Fourth: { label: "Fourth", color: "#2EB789" },
  Graduated: { label: "Graduated", color: "#9B59B6" },
} satisfies ChartConfig;

type Props = {
  first: number;
  second: number;
  third: number;
  fourth: number;
  graduated: number;
};

export function UsersCountChart({
  first,
  second,
  third,
  fourth,
  graduated,
}: Props) {
  const chartData = [
    { grade: "First", students: first, fill: chartConfig.First.color },
    { grade: "Second", students: second, fill: chartConfig.Second.color },
    { grade: "Third", students: third, fill: chartConfig.Third.color },
    { grade: "Fourth", students: fourth, fill: chartConfig.Fourth.color },
    {
      grade: "Graduated",
      students: graduated,
      fill: chartConfig.Graduated.color,
    },
  ];

  return (
    <Card className="w-full relative bg-Second-black text-white border-Main-black rounded-2xl">
      <div className="absolute right-[-1px] top-0 folder-clip-path w-[25%] h-2 bg-Main-black p-2 rounded-tr-2xl"></div>

      <CardHeader>
        <CardTitle>Classrooms</CardTitle>
        <CardDescription>Number of students in each class</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer className="h-72 w-full" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}>
            <YAxis
              dataKey="grade"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="students" type="number" hide />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar dataKey="students" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex items-start gap-4 text-sm flex-wrap">
        {chartData.map((d) => (
          <p key={d.grade} className="flex gap-2 items-center">
            <span
              className="block w-4 h-4 rounded-full"
              style={{ background: d.fill }}
            />
            {d.grade} students: {d.students}
          </p>
        ))}
      </CardFooter>
    </Card>
  );
}
