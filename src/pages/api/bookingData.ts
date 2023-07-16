import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  Timestamp: Date;
  "Purchase Id": string;
  Mail: string;
  Name: string;
  Source: string;
  Status: string;
  Select: boolean;
}[];
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json([
    {
      Timestamp: new Date("2023-07-01T09:12:34"),
      "Purchase Id": "P000001",
      Mail: "john@example.com",
      Name: "John Doe",
      Source: "Website",
      Status: "Paid",
      Select: true,
    },
    {
      Timestamp: new Date("2023-07-02T15:30:21"),
      "Purchase Id": "P000002",
      Mail: "emma@example.com",
      Name: "Emma Johnson",
      Source: "Mobile App",
      Status: "Waiting",
      Select: false,
    },
    {
      Timestamp: new Date("2023-07-03T12:45:15"),
      "Purchase Id": "P000003",
      Mail: "alex@example.com",
      Name: "Alex Smith",
      Source: "Website",
      Status: "Paid",
      Select: true,
    },
    {
      Timestamp: new Date("2023-07-04T08:20:39"),
      "Purchase Id": "P000004",
      Mail: "sarah@example.com",
      Name: "Sarah Anderson",
      Source: "Mobile App",
      Status: "Waiting",
      Select: false,
    },
    {
      Timestamp: new Date("2023-07-16T01:18:07"),
      "Purchase Id": "P000005",
      Mail: "michael@example.com",
      Name: "Michael Johnson",
      Source: "Website",
      Status: "Paid",
      Select: true,
    },
    {
      Timestamp: new Date("2023-07-06T11:30:55"),
      "Purchase Id": "P000006",
      Mail: "lisa@example.com",
      Name: "Lisa Brown",
      Source: "Mobile App",
      Status: "Waiting",
      Select: false,
    },
    {
      Timestamp: new Date("2023-07-07T14:55:23"),
      "Purchase Id": "P000007",
      Mail: "sam@example.com",
      Name: "Sam Wilson",
      Source: "Website",
      Status: "Paid",
      Select: true,
    },
    {
      Timestamp: new Date("2023-07-08T10:10:42"),
      "Purchase Id": "P000008",
      Mail: "julia@example.com",
      Name: "Julia Davis",
      Source: "Mobile App",
      Status: "Waiting",
      Select: false,
    },
    {
      Timestamp: new Date("2023-07-09T13:22:18"),
      "Purchase Id": "P000009",
      Mail: "peter@example.com",
      Name: "Peter Thompson",
      Source: "Website",
      Status: "Paid",
      Select: true,
    },
    {
      Timestamp: new Date("2023-07-15T09:05:58"),
      "Purchase Id": "P000010",
      Mail: "natalie@example.com",
      Name: "Natalie Wilson",
      Source: "Mobile App",
      Status: "Failed",
      Select: false,
    },
  ]);
}
