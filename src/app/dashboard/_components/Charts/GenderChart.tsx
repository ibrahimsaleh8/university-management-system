"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
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

type Props = {
  male: number;
  female: number;
  totalStudents: number;
};

const chartConfig = {
  male: { label: "Male", color: "#f3d553" },
  female: { label: "Female", color: "#9191f8" },
} satisfies ChartConfig;

export function GenderChart({ female, male, totalStudents }: Props) {
  const chartData = [
    { gender: "Male", count: male, fill: chartConfig.male.color },
    { gender: "Female", count: female, fill: chartConfig.female.color },
  ];

  return (
    <Card className="flex flex-col lg:w-[30rem] relative w-full bg-Second-black text-white rounded-2xl border-Main-black">
      <div className="absolute right-[-1px] top-0 folder-clip-path w-1/2 h-2 bg-Main-black p-2 rounded-tr-2xl"></div>

      <CardHeader className="items-center pb-0">
        <CardTitle>Gender</CardTitle>
        <CardDescription>
          Pie Chart - Student Gender Distribution
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold">
                          {totalStudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          Students
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-4 font-medium leading-none">
          {chartData.map((d) => (
            <div key={d.gender} className="flex items-center flex-col gap-3">
              <p
                className="w-5 h-5 rounded-full"
                style={{ background: d.fill }}></p>
              <p>{d.gender}</p>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
