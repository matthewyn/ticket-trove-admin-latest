"use client";

import { getUsers } from "@/actions/user";
import AppLayout from "@/components/app-layout";
import { Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import type { Prisma, User } from "@prisma/client";
import type { Booking } from "@prisma/client";
import type { Studio } from "@prisma/client";
import { getBookings } from "@/actions/bookings";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getStudios } from "@/actions/studios";
import { MoviePerformance, getMoviePerformance } from "@/actions/stats";

const data = [
  {
    name: "Sept",
    bookings: 4000,
    revenue: 2400,
    amt: 2400,
  },
  {
    name: "Oct",
    bookings: 3000,
    revenue: 1398,
    amt: 2210,
  },
  {
    name: "Nov",
    bookings: 2000,
    revenue: 9800,
    amt: 2290,
  },
  {
    name: "Dec",
    bookings: 2780,
    revenue: 3908,
    amt: 2000,
  },
  {
    name: "Jan",
    bookings: 1890,
    revenue: 4800,
    amt: 2181,
  },
  {
    name: "Feb",
    bookings: 2390,
    revenue: 3800,
    amt: 2500,
  },
  {
    name: "Mar",
    bookings: 3490,
    revenue: 4300,
    amt: 2100,
  },
];

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([] as User[]);
  const [bookings, setBookings] = useState<Booking[]>([] as Booking[]);
  const [studios, setStudios] = useState<Studio[]>([] as Studio[]);
  const [moviePerformance, setMoviePerformance] = useState<MoviePerformance[]>([] as MoviePerformance[]);
  const numUsers = users.length;
  const numBookings = bookings.length;
  const revenue = bookings.reduce((acc, cur) => acc + cur.totalAmount, 0);
  const numStudios = studios.length;

  useEffect(function () {
    async function fetchData() {
      const users = await getUsers();
      const bookings = await getBookings();
      const studios = await getStudios();
      const performance = await getMoviePerformance();
      setUsers(users);
      setBookings(bookings);
      setStudios(studios);
      setMoviePerformance(performance);
    }
    fetchData();
  }, []);

  const content =
    moviePerformance.length > 0
      ? moviePerformance.map((movie, i) => (
          <TableRow key={i + 1}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{movie._id}</TableCell>
            <TableCell>{movie.totalBooking}</TableCell>
            <TableCell className="text-[#0070f0]">&cent;{movie.values}</TableCell>
          </TableRow>
        ))
      : [];

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <section className="grid grid-cols-2 gap-6 items-start">
          <div className="grid grid-cols-2">
            <Card className="rounded-none rounded-tl-lg">
              <CardBody>
                <p className="text-sm">Users</p>
                <span className="font-semibold">{numUsers}</span>
              </CardBody>
            </Card>
            <Card className="rounded-none rounded-tr-lg">
              <CardBody>
                <p className="text-sm">Bookings</p>
                <span className="font-semibold">{numBookings}</span>
              </CardBody>
            </Card>
            <Card className="rounded-none rounded-bl-lg">
              <CardBody>
                <p className="text-sm">Revenue</p>
                <span className="font-semibold">${revenue}</span>
              </CardBody>
            </Card>
            <Card className="rounded-none rounded-br-lg">
              <CardBody>
                <p className="text-sm">Studios</p>
                <span className="font-semibold">{numStudios}</span>
              </CardBody>
            </Card>
          </div>
          <div className=" border shadow-md rounded-lg p-3">
            <h2 className="text-lg font-semibold mb-2">Bookings & Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#0070f0" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="bookings" stroke="#f472b6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Movie Performance</h2>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NO</TableColumn>
              <TableColumn>MOVIE</TableColumn>
              <TableColumn>BUYERS</TableColumn>
              <TableColumn>VALUES</TableColumn>
            </TableHeader>
            <TableBody emptyContent={!!moviePerformance}>{content}</TableBody>
          </Table>
        </section>
      </div>
    </AppLayout>
  );
}
