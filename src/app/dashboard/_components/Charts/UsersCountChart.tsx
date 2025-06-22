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
const chartData = [
  { class: "First", students: 275, fill: "#2662D9" },
  { class: "Second", students: 200, fill: "#E23670" },
  { class: "Third", students: 187, fill: "#E88C30" },
  { class: "Fourth", students: 173, fill: "#2EB789" },
];

const chartConfig = {
  students: {
    label: "students",
  },
  First: {
    label: "First",
    color: "hsl(var(--chart-1))",
  },
  Second: {
    label: "Second",
    color: "hsl(var(--chart-2))",
  },
  Third: {
    label: "Third",
    color: "hsl(var(--chart-3))",
  },
  Fourth: {
    label: "Fourth",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function UsersCountChart() {
  return (
    <Card className="w-full bg-Second-black text-white border-Main-black rounded-md">
      <CardHeader>
        <CardTitle>Classrooms</CardTitle>
        <CardDescription>Number of students in each class</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-60 w-full" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}>
            <YAxis
              dataKey="class"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="students" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="students" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <p className="flex gap-2 items-center">
          <span className="block w-4 h-4 rounded-full bg-[#2662D9]"></span>
          First grade: 20 Students
        </p>
        <p className="flex gap-2 items-center">
          <span className="block w-4 h-4 rounded-full bg-[#E23670]"></span>
          Second grade: 20 Students
        </p>
        <p className="flex gap-2 items-center">
          <span className="block w-4 h-4 rounded-full bg-[#E88C30]"></span>
          Third grade: 20 Students
        </p>
        <p className="flex gap-2 items-center">
          <span className="block w-4 h-4 rounded-full bg-[#2EB789]"></span>
          Fourth grade: 20 Students
        </p>
      </CardFooter>
    </Card>
  );
}
