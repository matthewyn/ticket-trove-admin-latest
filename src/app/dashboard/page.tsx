"use client";

import { getUsers } from "@/actions/user";
import AppLayout from "@/components/app-layout";
import { Button, Card, CardBody, CardFooter, Chip, Divider, Snippet, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import type { User } from "@prisma/client";
import type { Booking } from "@prisma/client";
import type { Studio } from "@prisma/client";
import { getBookings } from "@/actions/bookings";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getStudios } from "@/actions/studios";
import { MoviePerformance, getMoviePerformance } from "@/actions/stats";
import { HiEllipsisVertical } from "react-icons/hi2";
import { HiBanknotes } from "react-icons/hi2";
import { HiMiniFilm } from "react-icons/hi2";
import { HiIdentification } from "react-icons/hi2";
import { BsGoogle } from "react-icons/bs";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import Image from "next/image";
import streaming from "/public/streaming.svg";

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
          <div className="flex flex-col gap-4">
            <Card>
              <CardBody className="flex flex-col gap-4 relative">
                <div className="flex gap-1 items-center text-sm">
                  <HiMiniRocketLaunch color="red" />
                  <span className="font-bold ml-1">Upcoming Movies!</span>
                  <span>See the list below</span>
                </div>
                <div>
                  <h2 className="font-bold">Dive into the Exciting World of Upcoming Movies!</h2>
                  <p className="text-sm">(Prepare for The Exitement)</p>
                </div>
                <p>Let&apos;s take a sneak peek at some of the most anticipated films hitting the big screen soon:</p>
                <div>
                  <Snippet>npm run dev</Snippet>
                </div>
              </CardBody>
            </Card>
            <div className="grid grid-cols-2">
              <Card className="rounded-none rounded-tl-lg">
                <CardBody className="flex flex-col gap-1">
                  <p className="text-sm flex justify-between">
                    Users
                    <Button size="sm" isIconOnly aria-label="More">
                      <HiEllipsisVertical />
                    </Button>
                  </p>
                  <span className="font-semibold mb-1">{numUsers}</span>
                  <Chip size="sm" color="primary">
                    +22%
                  </Chip>
                </CardBody>
              </Card>
              <Card className="rounded-none rounded-tr-lg">
                <CardBody className="flex flex-col gap-1">
                  <p className="text-sm flex justify-between">
                    Bookings
                    <Button size="sm" isIconOnly aria-label="More">
                      <HiEllipsisVertical />
                    </Button>
                  </p>
                  <span className="font-semibold mb-1">{numBookings}</span>
                  <Chip size="sm" color="primary">
                    +21%
                  </Chip>
                </CardBody>
              </Card>
              <Card className="rounded-none rounded-bl-lg">
                <CardBody className="flex flex-col gap-1">
                  <p className="text-sm flex justify-between">
                    Revenue
                    <Button size="sm" isIconOnly aria-label="More">
                      <HiEllipsisVertical />
                    </Button>
                  </p>
                  <span className="font-semibold mb-1">${revenue}</span>
                  <Chip size="sm" color="primary">
                    +12.6%
                  </Chip>
                </CardBody>
              </Card>
              <Card className="rounded-none rounded-br-lg">
                <CardBody className="flex flex-col gap-1">
                  <p className="text-sm flex justify-between">
                    Studios
                    <Button size="sm" isIconOnly aria-label="More">
                      <HiEllipsisVertical />
                    </Button>
                  </p>
                  <span className="font-semibold mb-1">{numStudios}</span>
                  <Chip size="sm" color="primary">
                    +15.2%
                  </Chip>
                </CardBody>
              </Card>
            </div>
          </div>
          <div className=" border shadow-md rounded-lg p-3">
            <h2 className="text-lg font-semibold mb-2">Bookings & Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(val) => `¢${val}`} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" unit="¢" stroke="#0070f0" activeDot={{ r: 8 }} />
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
        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Recent Activities</h2>
          <Card>
            <CardBody className="flex flex-row gap-4">
              <HiBanknotes className="bg-gray-100 p-2 rounded-md" size={48} color="green" />
              <div>
                <h3 className="font-semibold">A user has just purchased a ticket</h3>
                <p className="text-sm">Kenneth Matthew just bought tickets for the film Ancika: Dia yang Bersamaku 1995</p>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between items-center text-sm">
              <p className="flex gap-1 items-center">
                <HiMiniFilm size={20} color="orange" />
                Studio
              </p>
              <span>1 mins ago</span>
            </CardFooter>
          </Card>
          <Card>
            <CardBody className="flex flex-row gap-4">
              <HiIdentification className="bg-gray-100 p-2 rounded-md" size={48} color="blue" />
              <div>
                <h3 className="font-semibold">New user has been registered</h3>
                <p className="text-sm">A new user named Madelyn Port has registered</p>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between items-center text-sm">
              <p className="flex gap-1 items-center">
                <BsGoogle size={16} />
                Google
              </p>
              <span>22 mins ago</span>
            </CardFooter>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
